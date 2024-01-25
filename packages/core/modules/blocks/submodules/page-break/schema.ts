import { z as zod } from "zod";

import { BlockElementType } from "../../constants";

import { BaseBlockSchema, BaseBlockConfigurationSchema } from "../base";

export const PageBreakBlockConfigurationSchema = BaseBlockConfigurationSchema; // no additional configuration

export const PageBreakBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.PAGE_BREAK),
  label: zod.string().min(1).nullable().default(null),
  nextPageButtonText: zod.string().min(1).default("Next"),
  previousPageButtonText: zod.string().min(1).default("Previous"),
  configuration: PageBreakBlockConfigurationSchema.default({}),
});
