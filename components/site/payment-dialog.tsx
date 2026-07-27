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

export function PaymentDialog({ disabled = false }: { disabled?: boolean }) {
  const [amount, setAmount] = useState("100")
  const [email, setEmail] = useState("")
  const [complete, setComplete] = useState(false)

  return (
    <Dialog onOpenChange={(open) => !open && setComplete(false)}>
      <DialogTrigger render={<Button size="lg" disabled={disabled} />}>
        {disabled ? "Donations coming soon" : "Donate to the summit"}
      </DialogTrigger>
      <DialogContent className="payment-dialog">
        <DialogHeader>
          <span className="dialog-icon"><CreditCardIcon /></span>
          <DialogTitle>Support the work behind the testimony</DialogTitle>
          <DialogDescription>
            Preview the contribution pathway. No payment will be taken.
          </DialogDescription>
        </DialogHeader>
        {complete ? (
          <div className="payment-success" role="status">
            <CheckIcon />
            <h3>Donation intent recorded</h3>
            <p>Your intention to contribute €{amount} has been recorded for {email}. No payment was taken.</p>
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
