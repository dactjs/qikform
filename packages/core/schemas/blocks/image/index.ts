import { z as zod } from "zod";
import { BaseBlockConfigurationSchema } from "../base";

///////////
// Types //
///////////

export type ImageBlock = zod.infer<typeof ImageBlockSchema>;

export type ImageBlockConfiguration = zod.infer<
  typeof ImageBlockConfigurationSchema
>;

/////////////
// Schemas //
/////////////

export const ImageBlockConfigurationSchema =
  BaseBlockConfigurationSchema.extend({
    // no additional configuration
  });

export const ImageBlockSchema = zod.object({
  url: zod.string().url(),
  configuration: ImageBlockConfigurationSchema,
});
