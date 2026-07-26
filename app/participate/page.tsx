"use client"

import { useState } from "react"
import { CheckIcon, HandHeartIcon, MailIcon, NewspaperIcon, UsersIcon } from "lucide-react"
import { toast } from "sonner"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PageHero } from "@/components/site/page-hero"
import { PaymentDialog } from "@/components/site/payment-dialog"
import { RegisterForm } from "@/components/site/register-form"
import { event } from "@/lib/content"

export default function ParticipatePage() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHero
        eyebrow="Attend and support"
        title="There is more than one way to enter the work."
        intro="Register as a delegate, volunteer, partner, sponsor, donor, or accredited member of the media."
        image="/images/paris-night.png"
      />
      <section className="participate-grid section-shell">
        <div>
          <p className="kicker">Attend in Paris</p>
          <h2>{event.dates}<br />{event.venue}</h2>
          <p>{event.address}</p>
        </div>
        <RegisterForm />
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
          <div><p className="kicker">Fund the work</p><h2>Help evidence reach institutions capable of acting.</h2><p>Mock checkout only; the production payment provider will be integrated later.</p></div>
          <PaymentDialog />
        </div>
      </section>
      <section className="contact-section section-shell" id="contact">
        <div>
          <p className="kicker">Contact the summit</p>
          <h2>Start the right conversation.</h2>
          <p>General enquiries · Registration · Media · Donation · Partnership</p>
        </div>
        {sent ? (
          <div className="contact-success" role="status"><CheckIcon /><h3>Message received</h3><p>The appropriate summit team would reply by email.</p></div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); setSent(true); toast("Message received") }}>
            <FieldSet>
              <FieldLegend>Enquiry details</FieldLegend>
              <FieldGroup>
                <Field><FieldLabel htmlFor="contact-name">Name</FieldLabel><Input id="contact-name" required /></Field>
                <Field><FieldLabel htmlFor="contact-email">Email</FieldLabel><Input id="contact-email" type="email" required /></Field>
                <Field><FieldLabel htmlFor="contact-subject">Subject</FieldLabel><Input id="contact-subject" required placeholder="Registration, media, donation, partnership…" /></Field>
                <Field><FieldLabel htmlFor="contact-message">Message</FieldLabel><Textarea id="contact-message" required /></Field>
                <Button type="submit">Send message</Button>
              </FieldGroup>
            </FieldSet>
          </form>
        )}
      </section>
    </>
  )
}
