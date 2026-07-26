"use client"

import Image from "next/image"

import { Cloth } from "@/components/canvasui/Cloth"

export function HeroClothBadge() {
  return (
    <div
      className="hero-cloth-shell"
      role="img"
      aria-label="Global human-rights summit, Paris 2026"
    >
      <Cloth
        className="hero-cloth"
        pin="top"
        wind={1.25}
        speed={0.32}
        amplitude={9}
        drape={12}
        brush={1.15}
        brushSize={76}
        damping={1.9}
        light={0.34}
        sheen={0.06}
        shadow={0.18}
        cornerRadius={2}
        backing={[0.16, 0.07, 0.1]}
        perspective={1600}
      >
        <div className="hero-cloth-content" aria-hidden="true">
          <Image
            src="/images/witness-flame-logo.png"
            alt=""
            width={34}
            height={34}
          />
          <span>
            <b>Global human-rights summit</b>
            <small>Paris · 2026</small>
          </span>
        </div>
      </Cloth>
    </div>
  )
}
