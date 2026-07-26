"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { useState } from "react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/site/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navItems } from "@/lib/content"
import { cn } from "@/lib/utils"

function Brand({ name = "Paris Assembly" }: { name?: string }) {
  return (
    <span className="brand-lockup">
      <Image
        className="brand-mark"
        src="/images/witness-flame-logo.png"
        alt=""
        width={44}
        height={44}
        priority
        aria-hidden="true"
      />
      <span>
        <b>{name}</b>
        <small>For dignity &amp; rights</small>
      </span>
    </span>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const settings = useQuery(api.settings.get)

  return (
    <header className="site-header">
      <Link href="/" aria-label="Paris Assembly home">
        <Brand name={settings?.shortName} />
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(pathname === item.href && "active")}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <ThemeToggle />
      <Button nativeButton={false} render={<Link href="/donate" />} className="header-action">
        Donate
      </Button>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              className="mobile-menu"
              aria-label="Open navigation"
            />
          }
        >
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="mobile-sheet">
          <SheetHeader>
            <SheetTitle><Brand name={settings?.shortName} /></SheetTitle>
            <SheetDescription>Global Solidarity Summit for Bangladeshi Hindus</SheetDescription>
          </SheetHeader>
          <nav aria-label="Mobile navigation">
            {[{ href: "/", label: "Home" }, ...navItems, { href: "/participate", label: "Reserve a place" }, { href: "/donate", label: "Donate" }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
