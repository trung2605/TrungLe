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
  'inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-canvas hover:bg-[#1a1a1a] dark:bg-[color:var(--color-ink)] dark:text-[color:var(--color-canvas)]',
        secondary: 'bg-canvas text-ink border border-hairline hover:bg-surface dark:bg-[color:var(--color-canvas)] dark:text-[color:var(--color-ink)] dark:border-[color:var(--color-hairline)] dark:hover:bg-[color:var(--color-surface-soft)]',
        ghost: 'bg-transparent text-ink hover:bg-surface dark:text-[color:var(--color-ink)] dark:hover:bg-[color:var(--color-surface-soft)]',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-5 py-2.5 text-[15px]',
        lg: 'px-7 py-3 text-[16px]',
        icon: 'w-10 h-10 p-0',
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
