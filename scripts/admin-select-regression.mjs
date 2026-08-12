import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

import ts from "typescript"

const sourceRoots = ["app", "components"]
const sourceFiles = []

function collectSourceFiles(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name)
    if (statSync(path).isDirectory()) collectSourceFiles(path)
    else if (path.endsWith(".tsx")) sourceFiles.push(path)
  }
}

for (const sourceRoot of sourceRoots) collectSourceFiles(sourceRoot)

const missingValues = []
let auditedOptions = 0

for (const sourceFile of sourceFiles) {
  const source = ts.createSourceFile(
    sourceFile,
    readFileSync(sourceFile, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  )

  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const elementName = node.tagName.getText(source)
      if (elementName === "option" || elementName === "SelectItem") {
        auditedOptions += 1
        const hasValue = node.attributes.properties.some(
          (attribute) =>
            ts.isJsxAttribute(attribute) &&
            attribute.name.getText(source) === "value"
        )
        if (!hasValue) {
          const position = source.getLineAndCharacterOfPosition(
            node.getStart(source)
          )
          missingValues.push(
            `${sourceFile}:${position.line + 1}:${position.character + 1}`
          )
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(source)
}

assert.deepEqual(
  missingValues,
  [],
  `Select options must declare machine values: ${missingValues.join(", ")}`
)

console.log(
  `Admin select regression checks passed (${auditedOptions} options audited).`
)
