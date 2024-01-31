'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {NavigationMenuItems} from './nav-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const countryLanguages = {
  en: 'English',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
};

interface NavigationMenuSectionProps {
  title: string;
  triggerContent: string;
  items: NavigationMenuItemProps[];
}

interface NavigationMenuItemProps {
  href: string;
  title: string;
  description: string;
}

interface NavigationProps {
  countryCode: string;
  action: string;
  findEV: NavigationMenuSectionProps;
  evGuides: NavigationMenuSectionProps;
}

function Dropdown({navigation}: {navigation: NavigationProps}) {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center cursor-pointer gap-2">
          <Image
            src={`/images/${navigation.countryCode}-flag.png`}
            alt={`${navigation.countryCode} Flag`}
            width={28}
            height={18}
          />
          <Image
            src="/images/chevron-down.svg"
            alt="dropdown"
            width={24}
            height={24}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {Object.entries(countryLanguages).map(([countryCode, language]) => (
          <Link
            key={countryCode}
            href={redirectedPathName(countryCode)}
            locale={countryCode}
          >
            <DropdownMenuItem>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 fill-current mr-1 ${navigation.countryCode === countryCode ? 'visible' : 'invisible'}`}
              >
                <path
                  d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
                  fill="currentColor"
                ></path>
              </svg>
              <Image
                src={`/images/${countryCode}-flag.png`}
                alt={`${countryCode} Flag`}
                width={28}
                height={18}
                className="mr-2"
              />
              {language}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Nav({navigation}: {navigation: NavigationProps}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // make menu full screen on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white w-full relative z-20 py-[1.125rem] px-4">
      <div className="max-w-[1223px] mx-auto flex items-end justify-between">
        <div className="flex items-end gap-8">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={153}
              height={29}
              priority
            />
          </Link>
          <div className="hidden md:flex">
            <NavigationMenuItems navigation={navigation} />
          </div>
        </div>
        <div className="items-end gap-8 hidden md:flex">
          <div className="relative -mb-[6px]">
            <Dropdown navigation={navigation} />
          </div>
          <Link href="#" className="text-grey font-semibold">
            {navigation.action}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Image
              src={isMenuOpen ? '/images/close.svg' : '/images/hamburger.svg'}
              alt={isMenuOpen ? 'Close menu' : 'Open menu'}
              width={24}
              height={24}
            />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute w-auto left-0 right-0 z-10 items-start gap-6 lg:hidden flex flex-col -mx-4 px-8 py-8 bg-white shadow-lg rounded-b-xl top-[68px] h-dvh">
            <Dropdown navigation={navigation} />
            <NavigationMenuItems navigation={navigation} />
          </div>
        )}
      </div>
    </header>
  );
}
