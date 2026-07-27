"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const revealCallbacks = new WeakMap<Element, () => void>()
let revealObserver: IntersectionObserver | undefined

function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          revealCallbacks.get(entry.target)?.()
          revealCallbacks.delete(entry.target)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "80px 0px", threshold: 0.08 }
    )
  }
  return revealObserver
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = getRevealObserver()
    revealCallbacks.set(element, () => setVisible(true))
    observer.observe(element)
    return () => {
      revealCallbacks.delete(element)
      observer.unobserve(element)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn("summit-reveal", visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
