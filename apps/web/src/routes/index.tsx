import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { listAxiomEvents } from "#/server/events"

const axiomEventsQueryOptions = queryOptions({
  queryKey: ["axiom-events"],
  queryFn: () => listAxiomEvents(),
  staleTime: 30_000,
})

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(axiomEventsQueryOptions),
  component: Home,
})

function Home() {
  const { data } = useSuspenseQuery(axiomEventsQueryOptions)

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-16">
      <section className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Axiom</p>
          <h1 className="text-3xl font-semibold tracking-tight">Recent events</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Showing {Math.min(data.length, 10)} of {data.length} events.
          </p>
        </div>

        {data.length === 0 ? (
          <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground shadow-sm">
            No events found.
          </div>
        ) : (
          <div className="space-y-4">
            {data.slice(0, 10).map((event, index) => (
              <article key={index} className="rounded-xl border bg-card p-4 shadow-sm">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Event {index + 1}
                </p>
                <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word text-sm">
                  {JSON.stringify(event, null, 2)}
                </pre>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
