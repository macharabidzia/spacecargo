import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BrandCardProps {
  logoSrc: string;
  description: string;
  href: string;
}

const BrandCard: React.FC<BrandCardProps> = ({
  logoSrc,
}) => {
  return (
    <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-lg border border-zinc-200 dark:border-zinc-800 transition-all duration-300 p-6 overflow-hidden">
      <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-sm mb-4 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
        <Image
          src={logoSrc}
          fill
          alt={`logo`}
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-end mt-4">
          <Link
            href={""}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm inline-flex items-center gap-2 px-5 py-2 bg-space-blue-muted text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
          >
            Go To Website
            <SquareArrowOutUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
