"use client"

import { useEffect } from "react"

import {
  AnimatedToastStack,
  type ToastInput,
  useAnimatedToastStack,
} from "@/components/motion/animated-toast-stack"

type ToastOptions = {
  description?: React.ReactNode
  duration?: number
  id?: string
}

type ToastListener = (input: ToastInput) => void

const listeners = new Set<ToastListener>()

function publish(status: ToastInput["status"], title: React.ReactNode, options?: ToastOptions) {
  const input: ToastInput = { status, title, ...options }
  listeners.forEach((listener) => listener(input))
  return input.id
}

export const toast = {
  success: (title: React.ReactNode, options?: ToastOptions) =>
    publish("success", title, options),
  error: (title: React.ReactNode, options?: ToastOptions) =>
    publish("error", title, options),
  info: (title: React.ReactNode, options?: ToastOptions) =>
    publish("info", title, options),
  loading: (title: React.ReactNode, options?: ToastOptions) =>
    publish("loading", title, { duration: 0, ...options }),
}

export function AnimatedToastProvider() {
  const { toasts, showToast, dismissToast } = useAnimatedToastStack({ limit: 5 })

  useEffect(() => {
    listeners.add(showToast)
    return () => {
      listeners.delete(showToast)
    }
  }, [showToast])

  return (
    <AnimatedToastStack
      toasts={toasts}
      onDismiss={dismissToast}
      placement="fixed"
      portal
      position="bottom-right"
      classNames={{
        surface: "rounded-none border-primary/20 bg-card/95 shadow-xl",
        iconWrap: "rounded-none",
        action: "rounded-none",
        close: "rounded-none",
        progress: "rounded-none",
      }}
    />
  )
}
