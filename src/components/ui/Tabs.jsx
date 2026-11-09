import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '../../lib/utils';

const Tabs = RadixTabs.Root;

const TabsList = ({ className, ...props }) => (
  <RadixTabs.List className={cn('flex gap-2 flex-wrap', className)} {...props} />
);

// Tactile notebook stamp/tab trigger matching the Robin design system —
// active state driven by Radix's data-state attribute.
const TabsTrigger = ({ className, count, children, ...props }) => (
  <RadixTabs.Trigger
    className={cn(
      'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] text-[12px] font-mono font-bold uppercase tracking-wide cursor-pointer',
      'border-[1.5px] border-[#18181B] bg-[#FFFFFF] text-[#18181B] shadow-[2px_2px_0px_#18181B] transition-all duration-150',
      'hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#18181B]',
      'dark:border-[color:var(--color-border-strong)] dark:bg-[color:var(--color-surface)] dark:text-[color:var(--color-ink)]',
      'data-[state=active]:bg-[#F5C242] data-[state=active]:text-[#18181B] data-[state=active]:border-[#18181B]',
      'dark:data-[state=active]:bg-[#F5C242] dark:data-[state=active]:text-[#18181B] dark:data-[state=active]:border-[#F5C242]',
      'group',
      className
    )}
    {...props}
  >
    {children}
    {count !== undefined && (
      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-[3px] bg-black/10 group-data-[state=active]:bg-black/15 dark:bg-white/10 dark:group-data-[state=active]:bg-black/20">
        {count}
      </span>
    )}
  </RadixTabs.Trigger>
);

const TabsContent = RadixTabs.Content;

export { Tabs, TabsList, TabsTrigger, TabsContent };
