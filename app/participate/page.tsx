"use client"

import { HandHeartIcon, MailIcon, NewspaperIcon, UsersIcon } from "lucide-react"
import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ManagedPageHero } from "@/components/site/managed-page-hero"
import { PaymentDialog } from "@/components/site/payment-dialog"
import { RegisterForm } from "@/components/site/register-form"
import { SupportForm } from "@/components/site/support-form"
import { event } from "@/lib/content"
import { formatEventDateRange } from "@/lib/event-format"

export default function ParticipatePage() {
  const settings = useQuery(api.settings.get)
  const registrationOpen = settings?.registrationOpen !== false
  const donationsEnabled = settings?.donationsEnabled !== false
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
          <p className="kicker">Attend in Paris</p>
          <h2>{eventDates}<br />{settings?.venue ?? event.venue}</h2>
          <p>{settings?.address ?? event.address}</p>
          <p>{settings?.languages ?? "English · French · Bengali interpretation"}</p>
        </div>
        <RegisterForm enabled={registrationOpen} />
      </section>
      <section className="support-options section-shell">
        <div className="section-heading compact"><p className="kicker">Engage and support</p><h2>Choose how you can contribute.</h2></div>
        <Accordion className="support-accordion">
          {[
            [UsersIcon, "Volunteer", "Support delegate welcome, production, documentation, translation, or event operations."],
            [HandHeartIcon, "Partner or sponsor", "Contribute institutional reach, expertise, travel support, production resources, or funding."],
            [NewspaperIcon, "Media accreditation", "Request newsroom access, interview coordination, background materials, and safeguarding guidance."],
          ].map(([Icon, title, text], index) => {
            const SupportIcon = Icon as typeof UsersIcon
            return <AccordionItem key={String(title)} value={`support-${index}`}><AccordionTrigger><SupportIcon />{String(title)}</AccordionTrigger><AccordionContent>{String(text)} Use the contact form below and select the relevant enquiry route.</AccordionContent></AccordionItem>
          })}
        </Accordion>
        <div className="donation-panel">
          <MailIcon />
          <div><p className="kicker">Fund the work</p><h2>Help evidence reach institutions capable of acting.</h2><p>Online payments are not yet open. You can preview the contribution pathway without being charged.</p></div>
          <PaymentDialog disabled={!donationsEnabled} />
        </div>
      </section>
      <section className="contact-section section-shell" id="contact">
        <div>
          <p className="kicker">Contact the summit</p>
          <h2>Start the right conversation.</h2>
          <p>General enquiries · Registration · Media · Donation · Partnership</p>
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
