"use client";
import DOMPurify from 'isomorphic-dompurify';

export default function NewsBody({ htmlContent, className }: { htmlContent: string; className: string }) {
    const sanitizedHtml = DOMPurify.sanitize(htmlContent, { USE_PROFILES: { html: true } });
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} className={className}></div>;
}