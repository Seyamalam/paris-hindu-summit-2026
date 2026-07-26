import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon, MailIcon, MapPinIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { event, navItems } from "@/lib/content"

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-callout">
        <p className="kicker">Paris · October 2026</p>
        <h2>One room. Many institutions. A shared commitment.</h2>
        <Button nativeButton={false} render={<Link href="/participate" />}>
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
            <b>Paris Assembly</b>
            <p>{event.descriptor}</p>
          </div>
        </div>
        <div className="footer-links">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <div className="footer-contact">
          <span><MapPinIcon /> {event.venue}, Drancy, Paris</span>
          <a href="mailto:eng.suvra@gmail.com"><MailIcon /> General enquiries</a>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 Paris Assembly</span>
        <span>Human rights · dignity · equal citizenship</span>
      </div>
    </footer>
  )
}
