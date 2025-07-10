import Image from "next/image";
import React from "react";

interface BrandCardProps {
  logoSrc: string; // Path to the brand logo image
  brandName: string; // The name of the brand (e.g., "Zara")
  description: string; // The descriptive text in Georgian
  linkText: string; // The text for the link (e.g., "იხილეთ საიტი")
  href: string; // The URL for the link
}

const BrandCard: React.FC<BrandCardProps> = ({
  logoSrc,
  brandName,
  description,
  linkText,
  href,
}) => {
  return (
    <div className="bg-background rounded-sm shadow-md p-4 flex items-start w-full transition-all duration-200 opacity-100 hover:opacity-90 hover:shadow-lg">
  
      <div className="w-40 h-40 flex-shrink-0 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm relative p-2">
        <Image
          src={logoSrc}
          fill
          alt={`${brandName} logo`}
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      <div className="ml-4 flex-grow">
        <h2 className="text-lg sm:text-xl font-bold dark:text-white text-gray-900 mb-1">
          {brandName}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-100 mb-3 leading-snug line-clamp-3">
          {description}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-xs sm:text-sm inline-flex items-center font-medium hover:underline transition-colors duration-200"
        >
          {linkText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default BrandCard;