"use client"

import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { ManagedText } from "@/components/site/managed-editorial"
import { ManagedPageHero } from "@/components/site/managed-page-hero"
import { RegisterForm } from "@/components/site/register-form"
import { SupportForm } from "@/components/site/support-form"
import { event } from "@/lib/content"
import { formatEventDateRange } from "@/lib/event-format"

export default function ParticipatePage() {
  const settings = useQuery(api.settings.get)
  const registrationOpen = settings?.registrationOpen !== false
  const eventDates = formatEventDateRange(
    settings?.eventStartIso,
    settings?.eventEndIso,
    settings?.timezone,
    event.dates
  )
  return (
    <>
      <ManagedPageHero
        slug="participate"
        eyebrow="Attend and support"
        title="There is more than one way to enter the work."
        intro="Register as a delegate, volunteer, partner, sponsor, donor, or accredited member of the media."
        image="/images/paris-night.png"
      />
      <section className="participate-grid section-shell">
        <div>
          <p className="kicker"><ManagedText slug="participate-attend-heading" field="eyebrow" fallback="Attend in Paris" /></p>
          <h2>{eventDates}<br />{settings?.venue ?? event.venue}</h2>
          <p>{settings?.address ?? event.address}</p>
          <p>{settings?.languages ?? "English · French · Bengali interpretation"}</p>
        </div>
        <RegisterForm enabled={registrationOpen} />
      </section>
      <section className="contact-section section-shell" id="contact">
        <div>
          <p className="kicker"><ManagedText slug="participate-contact-heading" field="eyebrow" fallback="Contact with us" /></p>
          <h2><ManagedText slug="participate-contact-heading" field="title" fallback="We will get back to you with answers." /></h2>
          <p><ManagedText slug="participate-contact-heading" field="summary" fallback="General enquiries · Registration · Media · Donation · Partnership" /></p>
          {settings?.contactEmail && (
            <p>
              <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
              {settings.phone && <> · <a href={`tel:${settings.phone}`}>{settings.phone}</a></>}
            </p>
          )}
        </div>
        <SupportForm />
      </section>
    </>
  )
}
