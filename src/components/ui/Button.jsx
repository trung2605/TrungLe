import { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Cache motion-wrapped components so repeated renders don't re-wrap (and lose identity/state).
const motionCache = new Map();
const toMotion = (Component) => {
  if (Component === motion.button) return Component;
  if (!motionCache.has(Component)) motionCache.set(Component, motion(Component));
  return motionCache.get(Component);
};

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[6px] font-mono uppercase tracking-wide font-bold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-[#18181B] text-[#FAF8F3] border-[1.5px] border-[#18181B] shadow-[3px_3px_0px_#18181B] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#18181B] dark:bg-[#F5C242] dark:text-[#18181B] dark:border-[#F5C242]',
        secondary: 'bg-[#FFFFFF] text-[#18181B] border-[1.5px] border-[#18181B] shadow-[2px_2px_0px_#18181B] hover:bg-[#F5C242] hover:-translate-y-0.5 dark:bg-[color:var(--color-surface)] dark:text-[color:var(--color-ink)] dark:border-[color:var(--color-border-strong)]',
        ghost: 'bg-transparent text-ink hover:bg-surface dark:text-[color:var(--color-ink)] dark:hover:bg-[color:var(--color-surface-soft)]',
      },
      size: {
        sm: 'px-3.5 py-1.5 text-xs',
        md: 'px-4 py-2 text-[13px]',
        lg: 'px-6 py-2.5 text-[14px]',
        icon: 'w-9 h-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// `as`: render as a different element/component (e.g. Link) while keeping the same styling.
const Button = forwardRef(({ className, variant, size, as = motion.button, ...props }, ref) => {
  const Component = useMemo(() => toMotion(as), [as]);
  return (
    <Component
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      whileTap={{ scale: 0.97 }}
      {...props}
    />
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
