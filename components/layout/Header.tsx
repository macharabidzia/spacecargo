'use server';

import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <header className={cn("w-full py-4", className)}>
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex space-x-6 justify-center items-center">
          <Link href="/" className="space-x-2 text-2xl font-bold text-foreground hover:text-primary">
            <div className='w-[88px] h-[88px] flex'>
              <Image src="/icons/logo.svg" width={88} height={88} alt='spacecargo icon' />
            </div>
          </Link>
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 foreground hover:text-primary transition-colors duration-200"
            >
              {item.title}
            </Link>
          ))}

        </nav>
        <nav className="flex items-center space-x-6">
          <Button variant='default' className='bg-space-blue-light rounded-md cursor-pointer'>რეგისტრაცია</Button>
          <Button variant='default' className='bg-space-blue rounded-md cursor-pointer'>შესვლა</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;