import { z as zod } from "zod";

import { BASE_BLOCK_KIND, BASE_BLOCK_NAME_REGEX } from "./constants";

export const BaseBlockSchema = zod.object({
  id: zod
    .string()
    .uuid()
    .default(() => globalThis.crypto.randomUUID()),

  kind: zod.literal(BASE_BLOCK_KIND).default(BASE_BLOCK_KIND),
  name: zod.string().min(1).regex(BASE_BLOCK_NAME_REGEX),
});

export const BaseBlockConfigurationSchema = zod.object({
  hidden: zod.boolean().default(false),
});
