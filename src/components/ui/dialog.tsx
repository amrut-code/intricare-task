import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const DialogContext = React.createContext<{
  open?: boolean
  setOpen?: (open: boolean) => void
}>({})

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  return (
    <DialogContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

export const DialogTrigger: React.FC<{
  children: React.ReactElement
  asChild?: boolean
}> = ({ children }) => {
  const { setOpen } = React.useContext(DialogContext)
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      if ((children as any).props?.onClick) (children as any).props.onClick(e);
      setOpen?.(true)
    }
  } as any)
}

export const DialogPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export const DialogOverlay: React.FC<{ className?: string }> = ({ className }) => {
  const { setOpen } = React.useContext(DialogContext)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setOpen?.(false)}
      className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-sm", className)}
    />
  )
}

export const DialogContent: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  const { open, setOpen } = React.useContext(DialogContext)
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogOverlay />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative z-50 w-full max-w-[620px] rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 text-slate-800 dark:text-zinc-100",
              className
            )}
          >
            {children}
            <button
              onClick={() => setOpen?.(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export const DialogHeader: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-1 text-left pb-4 border-b border-slate-100 dark:border-zinc-800", className)}>
    {children}
  </div>
)

export const DialogTitle: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <h3 className={cn("text-base font-bold leading-none tracking-tight text-slate-900 dark:text-white font-montserrat", className)}>
    {children}
  </h3>
)

export const DialogDescription: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <p className={cn("text-xs text-slate-400 dark:text-zinc-500 leading-normal", className)}>
    {children}
  </p>
)

export const DialogClose: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { setOpen } = React.useContext(DialogContext)
  return React.cloneElement(children as React.ReactElement, {
    onClick: (e: React.MouseEvent) => {
      const child = children as any
      if (child.props?.onClick) child.props.onClick(e);
      setOpen?.(false)
    }
  } as any)
}
