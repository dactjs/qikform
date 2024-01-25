import { z as zod } from "zod";

import { BlockElementType } from "../../constants";

import { BaseBlockSchema, BaseBlockConfigurationSchema } from "../base";

export const TextBlockConfigurationSchema = BaseBlockConfigurationSchema; // no additional configuration

export const TextBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.TEXT),
  content: zod.string().min(1),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  configuration: TextBlockConfigurationSchema.default({}),
});
