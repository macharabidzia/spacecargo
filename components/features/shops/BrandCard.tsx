import Image from "next/image";
import React from "react";

interface BrandCardProps {
  logoSrc: string;
  brandName: string;
  description: string;
  linkText: string;
  href: string;
}

const BrandCard: React.FC<BrandCardProps> = ({
  logoSrc,
  brandName,
  description,
  linkText,
  href,
}) => {
  return (
    <div className="bg-white/90 dark:bg-white/5 backdrop-blur-md rounded-lg shadow-md p-4 flex items-start w-full transition-all duration-300 border border-gray-200 dark:border-white/10 hover:shadow-xl hover:-translate-y-0.5">
      
      <div className="w-40 h-40 flex-shrink-0 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm relative p-2">
        <Image
          src={logoSrc}
          fill
          alt={`${brandName} logo`}
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      {/* Text content */}
      <div className="ml-4 flex-grow">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {brandName}
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-3 leading-snug line-clamp-3">
          {description}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm inline-flex items-center font-medium hover:underline group transition-colors duration-200"
        >
          {linkText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default BrandCard;
