"use client"

import { useState } from "react"
import { CheckIcon, SendIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function RegisterForm() {
  const [complete, setComplete] = useState(false)
  const [attendance, setAttendance] = useState("Paris delegate")

  if (complete) {
    return (
      <div className="form-success" role="status">
        <CheckIcon />
        <p className="kicker">Interest received</p>
        <h2>Your place in the room starts here.</h2>
        <p>The registration team would follow up with confirmation, access requirements, and payment details.</p>
        <Button variant="outline" onClick={() => setComplete(false)}>Register another delegate</Button>
      </div>
    )
  }

  return (
    <form
      className="registration-form"
      onSubmit={(event) => {
        event.preventDefault()
        setComplete(true)
        toast("Registration interest recorded")
      }}
    >
      <FieldSet>
        <FieldLegend>Delegate details</FieldLegend>
        <FieldDescription>Registration is currently in demonstration mode.</FieldDescription>
        <FieldGroup>
          <div className="form-grid">
            <Field>
              <FieldLabel htmlFor="full-name">Full name</FieldLabel>
              <Input id="full-name" name="name" required placeholder="Your name" />
            </Field>
            <Field>
              <FieldLabel htmlFor="registration-email">Email</FieldLabel>
              <Input id="registration-email" name="email" required type="email" placeholder="you@example.org" />
            </Field>
            <Field>
              <FieldLabel htmlFor="organisation">Organisation</FieldLabel>
              <Input id="organisation" name="organisation" placeholder="Optional" />
            </Field>
            <Field>
              <FieldLabel>Attendance</FieldLabel>
              <Select value={attendance} onValueChange={(value) => value && setAttendance(value)}>
                <SelectTrigger className="form-select"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["Paris delegate", "Student delegate", "Online participant", "Media"].map((item) => (
                      <SelectItem key={item} value={item}>{item}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="message">Access, visa, or participation notes</FieldLabel>
            <Textarea id="message" name="message" placeholder="Tell the registration team what you need." />
          </Field>
          <Button type="submit" size="lg">
            Send registration interest <SendIcon data-icon="inline-end" />
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
