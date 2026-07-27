"use client"

import { useState } from "react"
import { ArrowRightIcon, CheckIcon, CreditCardIcon, ShieldCheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEditorialRecord } from "@/components/site/managed-editorial"

export function PaymentDialog({ disabled = false }: { disabled?: boolean }) {
  const [amount, setAmount] = useState("100")
  const [email, setEmail] = useState("")
  const [complete, setComplete] = useState(false)
  const copy = useEditorialRecord("donate-dialog", {
    eyebrow:"Donations coming soon",
    title:"Support the work behind the testimony",
    summary:"Preview the contribution pathway. No payment will be taken.",
    body:"Donation intent recorded",
    secondaryText:"No payment was taken.",
    linkLabel:"Donate to the summit",
  })

  return (
    <Dialog onOpenChange={(open) => !open && setComplete(false)}>
      <DialogTrigger render={<Button size="lg" disabled={disabled} />}>
        {disabled ? copy.eyebrow : copy.linkLabel}
      </DialogTrigger>
      <DialogContent className="payment-dialog">
        <DialogHeader>
          <span className="dialog-icon"><CreditCardIcon /></span>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.summary}</DialogDescription>
        </DialogHeader>
        {complete ? (
          <div className="payment-success" role="status">
            <CheckIcon />
            <h3>{copy.body}</h3>
            <p>Your intention to contribute €{amount} has been recorded for {email}. {copy.secondaryText}</p>
          </div>
        ) : (
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Choose an amount</FieldLegend>
              <div className="amount-options">
                {["25", "50", "100", "250"].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={amount === value ? "default" : "outline"}
                    onClick={() => setAmount(value)}
                    aria-pressed={amount === value}
                  >
                    €{value}
                  </Button>
                ))}
              </div>
            </FieldSet>
            <Field>
              <FieldLabel htmlFor="donor-email">Email for receipt</FieldLabel>
              <Input id="donor-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.org" />
            </Field>
            <div className="mock-card">
              <ShieldCheckIcon />
              <span><b>Contribution preview</b><small>Secure online payments will open at a later date.</small></span>
            </div>
          </FieldGroup>
        )}
        {!complete && (
          <DialogFooter>
            <Button disabled={!email} onClick={() => setComplete(true)}>
              Record €{amount} contribution intent <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
