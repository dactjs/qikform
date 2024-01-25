import { z as zod } from "zod";

import { BlockElementType } from "../../constants";

import { BaseBlockSchema, BaseBlockConfigurationSchema } from "../base";

export const ImageBlockConfigurationSchema = BaseBlockConfigurationSchema; // no additional configuration

export const ImageBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.IMAGE),
  url: zod.string().url(),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  configuration: ImageBlockConfigurationSchema.default({}),
});
