import { createServerFn } from "@tanstack/react-start"

import { getAxiomClient } from "#/lib/client"
import { env } from "#/env"

const DEFAULT_EVENT_LIMIT = 100

type AxiomEvent = Record<string, {}>

export const listAxiomEvents = createServerFn({ method: "GET" }).handler(async () => {
  const axiom = getAxiomClient()

  const result = await axiom.query(`['${env.AXIOM_DATASET}'] | sort by _time desc | limit ${DEFAULT_EVENT_LIMIT}`, {
    format: "tabular",
  })

  return result.tables?.flatMap((table) => Array.from(table.events()) as AxiomEvent[]) ?? []
})
