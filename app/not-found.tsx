import { NotFoundStacked } from "@/components/motion/not-found/stacked"

export default function NotFound() {
  return (
    <div className="section-shell summit-not-found">
      <NotFoundStacked
        title="This page is outside the record."
        description="The address may have changed. Return to the summit archive or continue with the programme."
        homeLabel="Return home"
        browseHref="/programme"
        browseLabel="View programme"
      />
    </div>
  )
}
