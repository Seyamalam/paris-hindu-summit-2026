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
      <div className="page-hero-inner">
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <AudioLinesIcon aria-hidden="true" />
      </div>
      <div className="page-hero-aside" aria-hidden="true">
        {image ? (
          <Image src={image} alt="" fill priority sizes="(max-width: 720px) 100vw, 38vw" />
        ) : (
          <>
            <b>PARIS</b>
            <span>ASSEMBLY / 2026</span>
          </>
        )}
      </div>
    </section>
  )
}
