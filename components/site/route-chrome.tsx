"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const SiteFooter = dynamic(() =>
  import("@/components/site/site-footer").then((module) => module.SiteFooter)
)
const SiteHeader = dynamic(() =>
  import("@/components/site/site-header").then((module) => module.SiteHeader)
)

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
