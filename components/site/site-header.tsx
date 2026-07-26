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
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

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
  const programme = useQuery(api.programme.listPublished)
  const engage = useQuery(api.cms.listPublished, { category: "engage" })
  const media = useQuery(api.cms.listPublished, { category: "media" })
  const aboutLinks = [
    ["/about", "Overview"], ["/committee", "Organising team"], ["/committee#advisory", "Advisory council"],
    ["/programme", "Proposed agenda"], ["/context#charter", "Paris Resolution 2026"],
    ["/about#outcomes", "Five-year strategy"], ["/partners", "International partnerships"],
  ]
  const navGroups = [
    ["About", aboutLinks],
    ["Programme", programme?.map((item) => [`/programme#${item.slug}`, `${item.tabLabel} · ${item.navigationLabel}`]) ?? [["/programme", "Full programme"]]],
    ["Media", media?.map((item) => [item.linkUrl || "/media", item.title]) ?? [["/media", "Media & publications"]]],
    ["Engage", engage?.map((item) => [item.linkUrl || "/engage", item.title]) ?? [["/engage", "Ways to engage"]]],
  ] as const

  return (
    <>
    {settings?.announcementEnabled && <div className="announcement-strip"><span>{settings.announcement}</span><Link href="/participate">Register now</Link></div>}
    <header className={cn("site-header", settings?.announcementEnabled && "has-announcement")}>
      <Link href="/" aria-label="Paris Assembly home">
        <Brand name={settings?.shortName} />
      </Link>
      <NavigationMenu className="desktop-nav" aria-label="Main navigation">
        <NavigationMenuList>
          {navGroups.map(([label, links]) => <NavigationMenuItem key={label}>
            <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
            <NavigationMenuContent><ul className="summit-nav-panel">{links.map(([href,title]) => <li key={`${href}-${title}`}><NavigationMenuLink render={<Link href={href} />}><b>{title}</b></NavigationMenuLink></li>)}</ul></NavigationMenuContent>
          </NavigationMenuItem>)}
          <NavigationMenuItem><NavigationMenuLink render={<Link href="/regional" />} className={cn(pathname === "/regional" && "active")}>Regional</NavigationMenuLink></NavigationMenuItem>
          <NavigationMenuItem><NavigationMenuLink render={<Link href="/support" />} className={cn(pathname === "/support" && "active")}>Support</NavigationMenuLink></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle />
      <Button nativeButton={false} variant="outline" render={<Link href="/participate" />} className="header-secondary-action">
        Register
      </Button>
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
            {[{ href: "/", label: "Home" }, ...aboutLinks.map(([href,label]) => ({ href,label })), { href:"/regional",label:"Regional" }, { href:"/media",label:"Media" }, { href:"/engage",label:"Engage" }, { href:"/support",label:"Support" }, { href: "/participate", label: "Reserve a place" }, { href: "/donate", label: "Donate" }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
    </>
  )
}
