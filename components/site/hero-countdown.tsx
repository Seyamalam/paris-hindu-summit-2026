"use client"

import { useMemo } from "react"
import { useQuery } from "convex/react"
import { RadioIcon } from "lucide-react"

import FlipClock from "@/components/8starlabs-ui/flip-clock"
import { api } from "@/convex/_generated/api"

const FALLBACK_START = "2026-10-03T08:30:00+02:00"

function validDate(value: string | undefined) {
  const date = new Date(value ?? FALLBACK_START)
  return Number.isNaN(date.getTime()) ? new Date(FALLBACK_START) : date
}

export function HeroCountdown() {
  const settings = useQuery(api.settings.get)
  const targetDate = useMemo(
    () => validDate(settings?.eventStartIso),
    [settings?.eventStartIso]
  )
  const eventLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: settings?.timezone || "Europe/Paris",
      })
        .format(targetDate)
        .replace(",", " ·")
        .toUpperCase(),
    [settings?.timezone, targetDate]
  )

  return (
    <div className="hero-countdown">
      <div className="hero-countdown-topline">
        <span>
          <i aria-hidden="true" />
          Live countdown
        </span>
        <RadioIcon aria-hidden="true" />
      </div>

      <div className="hero-countdown-copy">
        <p>Paris opens in</p>
        <strong>Make the time count.</strong>
      </div>

      <div className="hero-clock-stage">
        <FlipClock
          countdown
          targetDate={targetDate}
          showDays="always"
          size="sm"
          variant="secondary"
          className="hero-flip-clock"
          aria-label={`Countdown to the summit on ${eventLabel}, ${settings?.timezone || "Europe/Paris"}`}
        />
        <div className="hero-clock-labels" aria-hidden="true">
          <span>Days</span>
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>

      <div className="hero-countdown-date">
        <span>03—04 / OCT</span>
        <span>{eventLabel}</span>
      </div>
    </div>
  )
}
