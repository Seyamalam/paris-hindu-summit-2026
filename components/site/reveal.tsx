"use client"

import { motion, useReducedMotion } from "motion/react"

import { SPRING_PANEL } from "@/lib/ease"
import { cn } from "@/lib/utils"

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn("summit-reveal is-visible", className)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.08, margin: "80px 0px" }}
      transition={
        reduce
          ? { duration: 0.2, delay: delay / 1000 }
          : { ...SPRING_PANEL, delay: delay / 1000 }
      }
    >
      {children}
    </motion.div>
  )
}
