"use client"

import { useQuery } from "convex/react"
import { ArrowRightIcon } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { ContentListSkeleton } from "@/components/site/content-list-skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProgrammeTabs() {
  const days = useQuery(api.programme.listPublished)
  if (days === undefined) return <ContentListSkeleton cards={2} />
  if (days.length === 0) return <p>No programme days are currently published.</p>
  return (
    <Tabs defaultValue={days[0].slug} className="programme-tabs">
      <TabsList variant="line" className="programme-tab-list">
        {days.map((day) => <TabsTrigger key={day._id} value={day.slug}><span>{day.tabLabel}</span>{day.navigationLabel} · {day.summary}</TabsTrigger>)}
      </TabsList>
      {days.map((day) => <TabsContent key={day._id} value={day.slug}>
        <p className="programme-day-date">{day.dateLabel}</p>
        <div className="schedule-list">
          {day.sessions.map((item, index) => (
            <article key={item._id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <time>{item.startTime}<small>{item.endTime}</small></time>
              <div><p className="kicker">{item.tag} · {item.location}</p><h3>{item.title}</h3><p>{item.description}</p><small>{item.speakers}</small></div>
              <ArrowRightIcon aria-hidden="true" />
            </article>
          ))}
        </div>
      </TabsContent>)}
    </Tabs>
  )
}
