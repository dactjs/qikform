import { z as zod } from "zod";

import { BlockElementType } from "../../../constants";
import { DeepPartial } from "../../../types";

import { BaseBlockSchema, BaseBlockConfigurationSchema } from "../base";

///////////
// Types //
///////////

export type CreateTextBlock = DeepPartial<TextBlock> & {
  type: typeof BlockElementType.TEXT;
  name: string;
  content: string;
};

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

export const TextBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.TEXT),
  content: zod.string().min(1),
  configuration: TextBlockConfigurationSchema.default({}),
});
