import { z as zod } from "zod";

import { BlockElementType } from "../../constants";
import type { DeepPartial } from "../../types";

import {
  BaseBlockSchema,
  BaseBlockConfigurationSchema,
} from "../base-block-schema";

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

export const DividerBlockConfigurationSchema = BaseBlockConfigurationSchema; // no additional configuration

export const DividerBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.DIVIDER),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  configuration: DividerBlockConfigurationSchema.default({}),
});
