type SocialNetwork = "facebook" | "x" | "instagram" | "linkedin" | "youtube"

export function SocialIcon({ network }: { network: SocialNetwork }) {
  if (network === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.7 22v-8.3h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.7-1.6H17V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.8v3.2h2.7V22h3.2Z"
        />
      </svg>
    )
  }

  if (network === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.2 2h3.4l-7.4 8.5L23 22h-6.9l-5.4-7-6.1 7H1.2l7.9-9L.7 2h7.1l4.9 6.4L18.2 2Zm-1.2 18h1.9L6.8 3.9h-2L17 20Z"
        />
      </svg>
    )
  }

  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
      </svg>
    )
  }

  if (network === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.3 7.8A2.3 2.3 0 1 0 5.3 3a2.3 2.3 0 0 0 0 4.7ZM3.4 21h3.8V9.2H3.4V21Zm6.1-11.8H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.8V21h-3.8v-5.7c0-1.4 0-3.1-2-3.1s-2.2 1.5-2.2 3V21H9.5V9.2Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"
      />
    </svg>
  )
}
