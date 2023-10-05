import { z as zod } from "zod";
import { BaseBlockConfigurationSchema } from "../base";

///////////
// Types //
///////////

export type TextBlock = zod.infer<typeof TextBlockSchema>;

export type TextBlockConfiguration = zod.infer<
  typeof TextBlockConfigurationSchema
>;

/////////////
// Schemas //
/////////////

export const TextBlockConfigurationSchema = BaseBlockConfigurationSchema.extend(
  {
    // no additional configuration
  }
);

export const TextBlockSchema = zod.object({
  content: zod.string().min(1),
  configuration: TextBlockConfigurationSchema,
});
