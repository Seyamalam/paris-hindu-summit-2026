"use client"

import { ArrowRightIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dayOne, dayTwo } from "@/lib/content"

function Schedule({ items }: { items: string[][] }) {
  return (
    <div className="schedule-list">
      {items.map(([time, title, description], index) => (
        <article key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <time>{time}</time>
          <div><h3>{title}</h3><p>{description}</p></div>
          <ArrowRightIcon aria-hidden="true" />
        </article>
      ))}
    </div>
  )
}

export function ProgrammeTabs() {
  return (
    <Tabs defaultValue="day-one" className="programme-tabs">
      <TabsList variant="line" className="programme-tab-list">
        <TabsTrigger value="day-one"><span>Day one</span> Understand · Engage · Inspire</TabsTrigger>
        <TabsTrigger value="day-two"><span>Day two</span> Collaborate · Commit · Conclude</TabsTrigger>
      </TabsList>
      <TabsContent value="day-one"><Schedule items={dayOne} /></TabsContent>
      <TabsContent value="day-two"><Schedule items={dayTwo} /></TabsContent>
    </Tabs>
  )
}
