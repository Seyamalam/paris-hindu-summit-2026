"use client"

import { usePathname } from "next/navigation"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export function RouteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) return <>{children}</>

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
