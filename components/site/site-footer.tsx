"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon, AtSignIcon, MailIcon, MapPinIcon, MessageCircleIcon, PhoneIcon, PlayIcon, UsersIcon } from "lucide-react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { event, navItems } from "@/lib/content"

export function SiteFooter() {
  const settings = useQuery(api.settings.get)
  return (
    <footer className="site-footer">
      <div className="footer-callout">
        <p className="kicker">Paris · October 2026</p>
        <h2>{settings?.footerTitle ?? "One room. Many institutions. A shared commitment."}</h2>
        <Button nativeButton={false} render={<Link href="/engage" />}>
          Take part <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
      </div>
      <Separator />
      <div className="footer-grid">
        <div className="footer-brand">
          <Image
            src="/images/witness-flame-logo.png"
            alt=""
            width={64}
            height={64}
            aria-hidden="true"
          />
          <div>
            <b>{settings?.shortName ?? "Paris Assembly"}</b>
            {settings?.eventName && <small>{settings.eventName}</small>}
            <p>{settings?.footerBody ?? event.descriptor}</p>
          </div>
        </div>
        <div className="footer-links">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          {settings?.registrationOpen !== false && <Link href="/participate">Register</Link>}
          {settings?.donationsEnabled !== false && <Link href="/donate">Donate</Link>}
        </div>
        <div className="footer-contact">
          <span><MapPinIcon /> {settings?.venue ?? event.venue}, {settings?.cityCountry ?? "Drancy, Paris"}</span>
          <a href={`mailto:${settings?.contactEmail ?? "eng.suvra@gmail.com"}`}><MailIcon /> General enquiries</a>
          {settings?.registrationEmail && <a href={`mailto:${settings.registrationEmail}`}><MailIcon /> Registration desk</a>}
          {settings?.pressEmail && <a href={`mailto:${settings.pressEmail}`}><MailIcon /> Press desk</a>}
          {settings?.phone && <a href={`tel:${settings.phone}`}><PhoneIcon /> {settings.phone}</a>}
          {settings?.whatsapp && <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}><MessageCircleIcon /> WhatsApp</a>}
          <div className="footer-socials">
            {settings?.facebookUrl && <a aria-label="Facebook" href={settings.facebookUrl}><UsersIcon /></a>}
            {settings?.xUrl && <a aria-label="X" href={settings.xUrl}><AtSignIcon /></a>}
            {settings?.instagramUrl && <a aria-label="Instagram" href={settings.instagramUrl}><AtSignIcon /></a>}
            {settings?.youtubeUrl && <a aria-label="YouTube" href={settings.youtubeUrl}><PlayIcon /></a>}
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 {settings?.shortName ?? "Paris Assembly"}</span>
        <span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · Human rights · dignity · equal citizenship</span>
      </div>
    </footer>
  )
}
