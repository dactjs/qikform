import { z as zod } from "zod";

import { BlockElementType } from "../../../constants";
import type { DeepPartial } from "../../../types";

import { BaseBlockSchema, BaseBlockConfigurationSchema } from "../base";

///////////
// Types //
///////////

export type CreateDividerBlock = DeepPartial<DividerBlock> & {
  type: typeof BlockElementType.DIVIDER;
  name: string;
};

export type DividerBlock = zod.infer<typeof DividerBlockSchema>;

export type DividerBlockConfiguration = zod.infer<
  typeof DividerBlockConfigurationSchema
>;

/////////////
// Schemas //
/////////////

export const DividerBlockConfigurationSchema =
  BaseBlockConfigurationSchema.extend({
    // no additional configuration
  });

export const DividerBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.DIVIDER),
  configuration: DividerBlockConfigurationSchema.default({}),
});
