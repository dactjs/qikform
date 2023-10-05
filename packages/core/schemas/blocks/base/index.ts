import { z as zod } from "zod";

///////////
// Types //
///////////

export type BaseBlockConfiguration = zod.infer<
  typeof BaseBlockConfigurationSchema
>;

/////////////
// Schemas //
/////////////

export const BaseBlockConfigurationSchema = zod.object({
  hidden: zod.boolean().default(false),
});
