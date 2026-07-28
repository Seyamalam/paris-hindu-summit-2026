export function ContentListSkeleton({
  cards = 3,
}: {
  cards?: number
}) {
  return (
    <div
      className="managed-list-skeleton"
      aria-busy="true"
      aria-label="Loading published content"
    >
      {Array.from({ length: cards }, (_, index) => (
        <div className="managed-list-skeleton-card" key={index}>
          <span className="content-skeleton managed-list-skeleton-kicker" />
          <span className="content-skeleton managed-list-skeleton-title" />
          <span className="content-skeleton managed-list-skeleton-copy" />
          <span className="content-skeleton managed-list-skeleton-copy short" />
        </div>
      ))}
    </div>
  )
}
