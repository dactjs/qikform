import { z as zod } from "zod";

import { BlockElementType } from "../../constants";

import { BaseBlockSchema, BaseBlockConfigurationSchema } from "../base";

export const CodeBlockConfigurationSchema = BaseBlockConfigurationSchema; // no additional configuration

export const CodeBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.CODE),
  content: zod.string().min(1),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  configuration: CodeBlockConfigurationSchema.default({}),
});
