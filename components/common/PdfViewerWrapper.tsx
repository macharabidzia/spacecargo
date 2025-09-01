"use client";

import { getToken } from "@/actions/parcel.actions";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const PDFViewer = dynamic(() => import("@/components/common/PdfViewer"), {
  ssr: false,
});

interface PdfViewerWrapperProps {
  fileUrl: string;
}

const PdfViewerWrapper = ({ fileUrl }: PdfViewerWrapperProps) => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileUrl) {
      setError("No file URL provided.");
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const fetchPDF = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken()
        const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(fileUrl)}`;
        const response = await fetch(proxyUrl, {
          signal: controller.signal, credentials: "include", headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF (status: ${response.status})`);
        }
        const blob = await response.blob();
        setPdfBlob(blob);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === "AbortError") return;
          console.error("PDF fetch error:", err);
          setError(err.message || "Unknown error");
        } else {
          console.error("PDF fetch error (non-Error):", err);
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPDF();
    return () => controller.abort();
  }, [fileUrl]);

  if (loading)
    return (
      <div className="flex items-center justify-center p-4"><Loading /></div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        Error: {error}
      </div>
    );
  if (!pdfBlob)
    return (
      null
    );

  return <PDFViewer file={pdfBlob} />;
};

export default PdfViewerWrapper;
