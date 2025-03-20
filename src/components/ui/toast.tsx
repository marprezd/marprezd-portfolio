'use client'

import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'

import * as React from 'react'

const ToastProvider = ToastPrimitives.Provider

function ToastViewport({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & { ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitives.Viewport>> }) {
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        'fixed top-0 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
        className,
      )}
      {...props}
    />
  )
}
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Toast({ ref, className, variant, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants> & { ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitives.Root>> }) {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
}
Toast.displayName = ToastPrimitives.Root.displayName

function ToastAction({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> & { ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitives.Action>> }) {
  return (
    <ToastPrimitives.Action
      ref={ref}
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 hover:group-[.destructive]:border-destructive/30 hover:group-[.destructive]:bg-destructive hover:group-[.destructive]:text-destructive-foreground focus:group-[.destructive]:ring-destructive',
        className,
      )}
      {...props}
    />
  )
}
ToastAction.displayName = ToastPrimitives.Action.displayName

function ToastClose({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close> & { ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitives.Close>> }) {
  return (
    <ToastPrimitives.Close
      ref={ref}
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 hover:group-[.destructive]:text-red-50 focus:group-[.destructive]:ring-red-400 focus:group-[.destructive]:ring-offset-red-600',
        className,
      )}
      toast-close=""
      {...props}
    >
      <X className="size-4" />
    </ToastPrimitives.Close>
  )
}
ToastClose.displayName = ToastPrimitives.Close.displayName

function ToastTitle({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title> & { ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitives.Title>> }) {
  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn('text-sm font-semibold', className)}
      {...props}
    />
  )
}
ToastTitle.displayName = ToastPrimitives.Title.displayName

function ToastDescription({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description> & { ref?: React.RefObject<React.ComponentRef<typeof ToastPrimitives.Description>> }) {
  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  )
}
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
}
