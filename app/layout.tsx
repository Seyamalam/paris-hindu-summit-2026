import type { Metadata } from "next"
import { Bodoni_Moda, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import "./assembly-theme.css"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" })
const displayFont = Bodoni_Moda({ subsets: ["latin"], variable: "--font-display" })
const utilityFont = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: {
    default: "Paris Assembly · 2026",
    template: "%s · Paris Assembly",
  },
  description: "Global Solidarity Summit for Bangladeshi Hindus, 3–4 October 2026 in Paris, France.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(bodyFont.variable, displayFont.variable, utilityFont.variable)}
    >
      <body>
        <ThemeProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
