import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Card = forwardRef(({ className, hoverable = true, ...props }, ref) => (
  <motion.div
    ref={ref}
    whileHover={hoverable ? { y: -4 } : undefined}
    className={cn(
      'bg-canvas border border-hairline rounded-lg overflow-hidden transition-shadow duration-200',
      'dark:bg-[color:var(--color-canvas)] dark:border-[color:var(--color-hairline)]',
      hoverable && 'hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-ink dark:hover:border-[color:var(--color-ink)]',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardImage = forwardRef(({ className, ...props }, ref) => (
  <div className={cn('relative overflow-hidden bg-surface aspect-[16/10]', className)}>
    <img ref={ref} loading="lazy" className="w-full h-full object-cover" {...props} />
  </div>
));
CardImage.displayName = 'CardImage';

const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export { Card, CardImage, CardContent };
