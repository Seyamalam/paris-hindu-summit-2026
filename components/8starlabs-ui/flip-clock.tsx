"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import {
  FC,
  HTMLAttributes,
  memo,
  ReactNode,
  useEffect,
  useState
} from "react";

const flipUnitVariants = cva(
  "relative subpixel-antialiased perspective-[1000px] rounded-md overflow-hidden",
  {
    variants: {
      size: {
        sm: "w-8 min-w-8 h-12 text-2xl", // Small (Compact UI)
        md: "w-14 min-w-14 h-20 text-5xl", // Medium (Standard sidebar/header)
        lg: "w-17 min-w-17 h-24 text-6xl", // Large (Focus/Hero)
        xl: "w-22 min-w-22 h-32 text-8xl" // Extra Large (Dashboard/Landing)
      },
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background text-foreground",
        muted: "bg-muted text-muted-foreground"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);

interface FlipUnitProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flipUnitVariants> {
  digit: number | string;
}

const commonCardStyle = cn(
  "absolute inset-x-0 overflow-hidden h-1/2 bg-inherit text-inherit"
);

const FlipUnit: FC<FlipUnitProps> = memo(function FlipUnit({
  digit,
  size,
  variant,
  className,
  ...props
}: FlipUnitProps) {
  const [prevDigit, setPrevDigit] = useState(digit);
  const flipping = digit !== prevDigit;

  useEffect(() => {
    if (flipping) {
      // Wait for the full animation (0.3s top + 0.3s bottom) before resetting
      const timer = setTimeout(() => {
        setPrevDigit(digit);
      }, 550); // Slightly less than 600ms to ensure smoothness
      return () => clearTimeout(timer);
    }
  }, [digit, flipping]);

  return (
    <div
      className={cn(flipUnitVariants({ size, variant }), className)}
      {...props}
    >
      {/* 1. Background Top (The NEW digit waiting) */}
      <div className={cn(commonCardStyle, "rounded-t-lg top-0")}>
        <DigitSpan position="top">{digit}</DigitSpan>
      </div>

      {/* 2. Background Bottom (The OLD digit staying) */}
      <div className={cn(commonCardStyle, "rounded-b-lg translate-y-full")}>
        <DigitSpan position="bottom">{prevDigit}</DigitSpan>
      </div>

      {/* 3. Top Flap (The OLD digit falling down) */}
      <div
        className={cn(
          commonCardStyle,
          "z-20 origin-bottom backface-hidden rounded-t-lg",
          flipping && "animate-flip-top"
        )}
      >
        <DigitSpan position="top">{prevDigit}</DigitSpan>
      </div>

      {/* 4. Bottom Flap (The NEW digit appearing) */}
      <div
        className={cn(
          commonCardStyle,
          "z-10 origin-top backface-hidden rounded-b-lg translate-y-full",
          flipping && "animate-flip-bottom"
        )}
        style={{ transform: "rotateX(90deg)" }}
      >
        <DigitSpan position="bottom">{digit}</DigitSpan>
      </div>

      {/* Center Divider Shadow */}
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-background/50 z-30" />
    </div>
  );
});

interface DigitSpanProps {
  children: ReactNode;
  position?: "top" | "bottom";
}

function DigitSpan({ children, position }: DigitSpanProps) {
  return (
    <span
      className={cn(
        "absolute left-0 right-0 w-full flex items-center justify-center",
        // The span should be the full height of the PARENT FlipUnit (200% of the half-card)
        "h-[200%]"
      )}
      style={{
        // If it's the top half, align the full span to the top
        // If it's the bottom half, shift the full span up so its bottom half shows
        top: position === "top" ? "0%" : "-100%"
      }}
    >
      {children}
    </span>
  );
}

const flipClockVariants = cva(
  "relative flex justify-center items-center font-mono font-medium",
  {
    variants: {
      size: {
        sm: "text-2xl gap-1",
        md: "text-4xl gap-2",
        lg: "text-5xl gap-2",
        xl: "text-7xl gap-3"
      },
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
        muted: ""
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);

interface FlipClockProps
  extends VariantProps<typeof flipClockVariants>,
    HTMLAttributes<HTMLDivElement> {
  countdown?: boolean;
  targetDate?: Date;
  showDays?: "auto" | "always" | "never";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const INITIAL_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

type FlipClockSize = NonNullable<
  VariantProps<typeof flipClockVariants>["size"]
>;

const heightMap: Record<FlipClockSize, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-7xl"
};

function ClockSeparator({ size }: { size?: FlipClockSize }) {
  return (
    <span
      className={cn(
        "flip-clock-separator text-center -translate-y-[8%]",
        size ? heightMap[size] : heightMap["md"]
      )}
      aria-hidden="true"
    >
      :
    </span>
  );
}

function DigitGroup({ children }: { children: ReactNode }) {
  return <span className="flip-clock-group flex gap-1">{children}</span>;
}

export default function FlipClock({
  countdown = false,
  targetDate,
  size,
  variant,
  showDays = "auto",
  className,
  ...props
}: FlipClockProps) {
  const [time, setTime] = useState<TimeLeft>(INITIAL_TIME);

  useEffect(() => {
    const updateTime = () => {
      const nextTime = getTime(countdown, targetDate);

      setTime((prev) => {
        if (
          prev.days === nextTime.days &&
          prev.hours === nextTime.hours &&
          prev.seconds === nextTime.seconds &&
          prev.minutes === nextTime.minutes
        ) {
          return prev;
        }
        return nextTime;
      });
    };

    updateTime();

    // Run a faster heartbeat (250ms) to catch the second rollover immediately
    const timer = setInterval(updateTime, 250); // 4fps check is plenty

    return () => clearInterval(timer);
  }, [countdown, targetDate]);

  const daysStr = String(time.days).padStart(3, "0");
  const hoursStr = String(time.hours).padStart(2, "0");
  const minutesStr = String(time.minutes).padStart(2, "0");
  const secondsStr = String(time.seconds).padStart(2, "0");

  const shouldShowDays =
    countdown &&
    (showDays === "always" || (showDays === "auto" && time.days > 0));

  return (
    <div
      className={cn(flipClockVariants({ size, variant }), className)}
      aria-live="polite"
      role="timer"
      {...props}
    >
      <span className="sr-only absolute">
        {`${shouldShowDays ? `${time.days} days, ` : ""}${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`}
      </span>

      {/* Days */}
      {shouldShowDays && (
        <>
          <DigitGroup>
            {daysStr.split("").map((digit, i) => (
              <FlipUnit
                key={`d-${i}`}
                digit={digit}
                size={size}
                variant={variant}
                data-flip-unit=""
              />
            ))}
          </DigitGroup>
          <ClockSeparator size={size!} />
        </>
      )}

      {/* Hours */}
      <DigitGroup>
        {hoursStr.split("").map((digit, index) => (
          <FlipUnit
            key={`hour-${index}`}
            digit={digit}
            size={size}
            variant={variant}
            data-flip-unit=""
          />
        ))}
      </DigitGroup>

      <ClockSeparator size={size!} />

      {/* Minutes */}
      <DigitGroup>
        {minutesStr.split("").map((digit, index) => (
          <FlipUnit
            key={`minute-${index}`}
            digit={digit}
            size={size}
            variant={variant}
            data-flip-unit=""
          />
        ))}
      </DigitGroup>

      <ClockSeparator size={size!} />

      {/* Seconds */}
      <DigitGroup>
        {secondsStr.split("").map((digit, index) => (
          <FlipUnit
            key={`second-${index}`}
            digit={digit}
            size={size}
            variant={variant}
            data-flip-unit=""
          />
        ))}
      </DigitGroup>
    </div>
  );
}

function getTime(countdown: boolean, targetDate?: Date): TimeLeft {
  const now = new Date();

  // Real-time Clock Mode
  if (!countdown) {
    return {
      days: 0,
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    };
  }

  // Countdown Mode
  if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diff = Math.max(0, targetDate.getTime() - now.getTime());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}
