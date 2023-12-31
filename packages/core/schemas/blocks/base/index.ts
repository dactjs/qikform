import { z as zod } from "zod";

import { FormElementCategory } from "../../../constants";

///////////
// Types //
///////////

export type BaseBlock = zod.infer<typeof BaseBlockSchema>;

export type BaseBlockConfiguration = zod.infer<
  typeof BaseBlockConfigurationSchema
>;

/////////////
// Schemas //
/////////////

export const BaseBlockSchema = zod.object({
  id: zod
    .string()
    .uuid()
    .default(() => globalThis.crypto.randomUUID()),

  category: zod
    .literal(FormElementCategory.BLOCK)
    .default(FormElementCategory.BLOCK),

  name: zod
    .string()
    .min(1)
    .regex(/^[0-9a-zA-Z_]+$/),
});

export const BaseBlockConfigurationSchema = zod.object({
  hidden: zod.boolean().default(false),
});
