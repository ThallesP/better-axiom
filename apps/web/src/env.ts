import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

const isServer = typeof window === "undefined"

export const env = createEnv({
  server: {
    AXIOM_DATASET: z.string().min(1),
    AXIOM_TOKEN: z.string().min(1),
  },
  client: {},
  clientPrefix: "VITE_",
  runtimeEnv: {
    AXIOM_DATASET: isServer ? process.env.AXIOM_DATASET : undefined,
    AXIOM_DATASET_NAME: isServer ? process.env.AXIOM_DATASET_NAME : undefined,
    AXIOM_TOKEN: isServer ? process.env.AXIOM_TOKEN : undefined,
  },
  isServer,
  emptyStringAsUndefined: true,
})
