import { Axiom } from "@axiomhq/js"

import { env } from "#/env"

let client: Axiom | undefined

export function getAxiomClient() {
  client ??= new Axiom({
    token: env.AXIOM_TOKEN,
  })

  return client
}