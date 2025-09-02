"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const PDFViewer = dynamic(() => import("@/components/common/PdfViewer"), {
  ssr: false,
});

interface PdfViewerWrapperProps {
  fileUrl: string | null; // allow null when modal closed
}

const PdfViewerWrapper = ({ fileUrl }: PdfViewerWrapperProps) => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileUrl) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchPDF = async () => {
      setLoading(true);
      setError(null);

      try {
        const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(fileUrl)}`;
        const response = await fetch(proxyUrl, {
          credentials: "include",
          signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch PDF (status: ${response.status})`);
        }

        const blob = await response.blob();
        setPdfBlob(blob);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === "AbortError") return;
          setError(err.message || "Unknown error");
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPDF();

    return () => {
      controller.abort(); // cancels fetch if modal closes quickly
    };
  }, [fileUrl]);

  // Don't render until fileUrl exists
  if (!fileUrl) return null;

  if (loading)
    return (
      <div className="flex items-center justify-center p-4 h-40">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        Error: {error}
      </div>
    );

  if (!pdfBlob) return null;

  return <PDFViewer file={pdfBlob} />;
};

export default PdfViewerWrapper;
