"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X, File as FileIcon, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomFileUploadProps {
  id: string;
  multiple?: boolean;
  onChange: (files: (File | string)[] | null) => void;
  value?: (File | string)[] | null;
  className?: string;
  placeholder?: string;
}

interface FilePreview {
  id: string;
  file?: File;
  url: string;
  name: string;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  id,
  multiple = false,
  onChange,
  value,
  className,
  placeholder = "Upload files",
}) => {
  const [previews, setPreviews] = useState<FilePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value || value.length === 0) {
      setPreviews([]);
      return;
    }

    const newPreviews: FilePreview[] = value.map((v, idx) => {
      if (typeof v === "string") {
        return {
          id: `url-${idx}-${Math.random()}`,
          url: v,
          name: `File ${idx + 1}`,
        };
      } else {
        return {
          id: `file-${idx}-${v.name}-${v.lastModified}-${Math.random()}`,
          file: v,
          url: v.name,
          name: `File ${idx + 1}`,
        };
      }
    });

    setPreviews(newPreviews);
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const existing: (File | string)[] = value || [];
    const newFiles = Array.from(files);

    const updated = multiple ? [...existing, ...newFiles] : newFiles;

    onChange(updated);
  };

  const handleDelete = (idToDelete: string) => {
    const updatedPreviews = previews.filter((p) => p.id !== idToDelete);
    const updatedValues = updatedPreviews.map((p) => p.file ?? p.url);
    onChange(updatedValues.length > 0 ? updatedValues : null);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Input
        id={id}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
        className="hidden"
        accept="*"
      />

      <div
        className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md  border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={triggerFileInput}
      >
        <UploadCloud className="w-8 h-8 mb-2 text-blue-500" />
        <p className="text-sm font-medium">{placeholder}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Click or drag and drop files here</p>
      </div>

      {previews.length > 0 && (
        <div className="flex flex-col gap-2">
          {previews.map((preview, i) => (
            <div
              key={preview.id}
              className="flex items-center justify-between p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <div className="flex items-center gap-2">
                <FileIcon className="w-4 h-4" />
                <span>{`File ${i + 1}`}</span>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(preview.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomFileUpload;
