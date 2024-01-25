import { z as zod } from "zod";

import { BlockElementType } from "../../constants";

import { BaseBlockSchema, BaseBlockConfigurationSchema } from "../base";

export const DividerBlockConfigurationSchema = BaseBlockConfigurationSchema; // no additional configuration

export const DividerBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.DIVIDER),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  configuration: DividerBlockConfigurationSchema.default({}),
});
