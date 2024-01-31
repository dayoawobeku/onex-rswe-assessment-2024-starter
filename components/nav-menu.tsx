import * as React from 'react';
import Link from 'next/link';
import {cn} from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface ListItemProps {
  className?: string;
  title: string;
  children?: React.ReactNode;
  href: string;
  description?: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({className, title, children, href, description, ...props}, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href}
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
            passHref
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description || children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';

interface NavigationMenuSectionProps {
  title: string;
  triggerContent: string;
  items: ListItemProps[];
}

export function NavigationMenuSection({
  triggerContent,
  items,
}: NavigationMenuSectionProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{triggerContent}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          {items.map(item => (
            <ListItem
              key={item.title}
              title={item.title}
              href={item.href}
              description={item.description}
            />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

interface NavigationMenuItemsProps {
  navigation: {
    findEV: NavigationMenuSectionProps;
    evGuides: NavigationMenuSectionProps;
  };
}

export function NavigationMenuItems({navigation}: NavigationMenuItemsProps) {
  const sections: NavigationMenuSectionProps[] = [
    navigation.findEV,
    navigation.evGuides,
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {sections.map(section => (
          <NavigationMenuSection key={section.title} {...section} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
