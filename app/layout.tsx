import type { Metadata } from "next"
import { Bodoni_Moda, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import "./assembly-theme.css"
import { ConvexClientProvider } from "@/components/convex-client-provider"
import { RouteChrome } from "@/components/site/route-chrome"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" })
const displayFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
})
const utilityFont = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: {
    default: "Paris Assembly · 2026",
    template: "%s · Paris Assembly",
  },
  description:
    "Global Solidarity Summit for Bangladeshi Hindus, 3–4 October 2026 in Paris, France.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        bodyFont.variable,
        displayFont.variable,
        utilityFont.variable
      )}
    >
      <body>
        <ConvexClientProvider>
          <ThemeProvider>
            <TooltipProvider>
              <RouteChrome>{children}</RouteChrome>
              <Toaster position="bottom-right" />
            </TooltipProvider>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
