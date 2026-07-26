"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { event, navItems } from "@/lib/content"
import { cn } from "@/lib/utils"

function Brand() {
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
        <b>{event.name}</b>
        <small>Paris · 2026</small>
      </span>
    </span>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="site-header">
      <Link href="/" aria-label="Dharma is Distress home">
        <Brand />
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
      <Button nativeButton={false} render={<Link href="/participate" />} className="header-action">
        Attend in Paris
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
            <SheetTitle><Brand /></SheetTitle>
            <SheetDescription>Global Solidarity Summit for Bangladeshi Hindus</SheetDescription>
          </SheetHeader>
          <nav aria-label="Mobile navigation">
            {[{ href: "/", label: "Home" }, ...navItems, { href: "/participate", label: "Attend and support" }].map((item) => (
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
