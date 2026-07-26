import Image from "next/image"
import { AudioLinesIcon } from "lucide-react"

type PageHeroProps = {
  eyebrow: string
  title: string
  intro: string
  image?: string
}

export function PageHero({ eyebrow, title, intro, image }: PageHeroProps) {
  return (
    <section className={image ? "page-hero with-image" : "page-hero"}>
      {image && <Image src={image} alt="" fill priority sizes="100vw" />}
      <div className="page-hero-inner">
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <AudioLinesIcon aria-hidden="true" />
      </div>
    </section>
  )
}
