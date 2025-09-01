"use client";
import { pdfjs, Document, Page } from "react-pdf";
import { useState, useRef, useEffect } from "react";

interface PDFViewerProps {
    file: File | Blob;
    className?: string;
}

export default function PDFViewer({ file, className }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.js`;
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (error: Error) => {
        if (error.message && error.message.includes("TextLayer task cancelled")) {
            return;
        }
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentRect) {
                    setContainerWidth(entry.contentRect.width);
                }
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    if (!file) {
        return null;
    }

    return (
        <div ref={containerRef} className={`flex flex-col items-center w-full ${className}`}>
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                className="w-full"
            >
                <div className="space-y-4">
                    {Array.from(new Array(numPages), (el, index) => (
                        <div key={`page-${index + 1}`}>
                            <Page
                                renderTextLayer={false}
                                pageNumber={index + 1}
                                width={containerWidth > 0 ? containerWidth : undefined}
                            />
                        </div>
                    ))}
                </div>
            </Document>
        </div>
    );
}