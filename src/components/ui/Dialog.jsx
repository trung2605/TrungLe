import * as RadixDialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { cn } from '../../lib/utils';

// Self-contained controlled dialog: pass `open` + `onOpenChange`, get focus-trap,
// ESC-to-close, and ARIA semantics for free (Radix), with the site's existing
// fade/scale motion (Framer Motion) layered on top.
const Dialog = ({ open, onOpenChange, className, contentClassName, children, showClose = true, title = 'Dialog', ...props }) => (
  <AnimatePresence>
    {open && (
      <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
        <RadixDialog.Portal forceMount>
          <RadixDialog.Overlay asChild forceMount>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6"
            >
              <RadixDialog.Content
                asChild
                forceMount
                onOpenAutoFocus={(e) => e.preventDefault()}
                className={cn('outline-none', className)}
                {...props}
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 16 }}
                  transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    'bg-canvas dark:bg-[color:var(--color-canvas)] rounded-lg max-w-[680px] w-full max-h-[90vh] overflow-y-auto relative',
                    contentClassName
                  )}
                >
                  <RadixDialog.Title className="sr-only">{title}</RadixDialog.Title>
                  {showClose && (
                    <RadixDialog.Close asChild>
                      <button
                        aria-label="Close"
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white border border-white/20 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
                      >
                        <FaTimes size={14} />
                      </button>
                    </RadixDialog.Close>
                  )}
                  {children}
                </motion.div>
              </RadixDialog.Content>
            </motion.div>
          </RadixDialog.Overlay>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    )}
  </AnimatePresence>
);

export { Dialog };
