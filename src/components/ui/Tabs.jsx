import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '../../lib/utils';

const Tabs = RadixTabs.Root;

const TabsList = ({ className, ...props }) => (
  <RadixTabs.List className={cn('flex gap-2 flex-wrap', className)} {...props} />
);

// Pill-shaped trigger matching the site's existing filter-button look —
// active state driven by Radix's data-state attribute instead of manual useState comparisons.
const TabsTrigger = ({ className, count, children, ...props }) => (
  <RadixTabs.Trigger
    className={cn(
      'inline-flex items-center gap-1.5 px-[18px] py-2 rounded-pill text-[15px] cursor-pointer',
      'border-[1.5px] border-hairline bg-canvas text-ink transition-all duration-150',
      'dark:border-[color:var(--color-hairline)] dark:bg-[color:var(--color-canvas)] dark:text-[color:var(--color-ink)]',
      'data-[state=active]:bg-ink data-[state=active]:text-canvas data-[state=active]:border-ink data-[state=active]:font-medium',
      'dark:data-[state=active]:bg-[color:var(--color-ink)] dark:data-[state=active]:text-[color:var(--color-canvas)]',
      'group',
      className
    )}
    {...props}
  >
    {children}
    {count !== undefined && (
      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-pill bg-black/10 group-data-[state=active]:bg-white/20 dark:bg-white/10">
        {count}
      </span>
    )}
  </RadixTabs.Trigger>
);

const TabsContent = RadixTabs.Content;

export { Tabs, TabsList, TabsTrigger, TabsContent };
