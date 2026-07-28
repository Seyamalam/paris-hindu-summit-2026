"use client"

import { useCallback, useState } from "react"

import {
  FileUpload,
  type FileUploadItem,
} from "@/components/motion/file-upload"

export function AdminFileUpload({
  accept,
  title,
  description,
  disabled = false,
  onUpload,
}: {
  accept: string
  title: string
  description: string
  disabled?: boolean
  onUpload: (file: File) => Promise<void>
}) {
  const [items, setItems] = useState<FileUploadItem[]>([])

  const runUpload = useCallback(
    async (item: FileUploadItem) => {
      const file = item.file
      if (!file) return

      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? { ...entry, status: "uploading", progress: 18, error: undefined }
            : entry
        )
      )

      try {
        await onUpload(file)
        setItems((current) =>
          current.map((entry) =>
            entry.id === item.id
              ? { ...entry, status: "success", progress: 100 }
              : entry
          )
        )
      } catch (error) {
        setItems((current) =>
          current.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  status: "error",
                  progress: 0,
                  error: error instanceof Error ? error.message : "Upload failed",
                }
              : entry
          )
        )
      }
    },
    [onUpload]
  )

  return (
    <FileUpload
      value={items}
      onValueChange={setItems}
      onFilesAdded={(added) => {
        const item = added[0]
        if (item) void runUpload(item)
      }}
      onRetry={(item) => void runUpload(item)}
      onRemove={(item) =>
        setItems((current) => current.filter((entry) => entry.id !== item.id))
      }
      accept={accept}
      multiple={false}
      maxFiles={1}
      disabled={disabled}
      title={title}
      description={description}
      browseLabel="Choose file"
      className="admin-file-upload"
      classNames={{
        root: "flex flex-col gap-3",
        dropzone: "rounded-none bg-card",
        item: "rounded-none bg-card",
        leading: "rounded-none",
        progress: "rounded-none",
        action: "rounded-none",
      }}
    />
  )
}
