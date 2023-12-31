import { z as zod } from "zod";

import { BlockElementType } from "../../../constants";
import type { DeepPartial } from "../../../types";

import { BaseBlockSchema, BaseBlockConfigurationSchema } from "../base";

///////////
// Types //
///////////

export type CreatePageBreakBlock = DeepPartial<PageBreakBlock> & {
  type: typeof BlockElementType.PAGE_BREAK;
  name: string;
};

export type PageBreakBlock = zod.infer<typeof PageBreakBlockSchema>;

export type PageBreakBlockConfiguration = zod.infer<
  typeof PageBreakBlockConfigurationSchema
>;

/////////////
// Schemas //
/////////////

export const PageBreakBlockConfigurationSchema =
  BaseBlockConfigurationSchema.extend({
    // no additional configuration
  });

export const PageBreakBlockSchema = BaseBlockSchema.omit({
  helperText: true,
}).extend({
  type: zod.literal(BlockElementType.PAGE_BREAK),
  configuration: PageBreakBlockConfigurationSchema.default({}),
});
