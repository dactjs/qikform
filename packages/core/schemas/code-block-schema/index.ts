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

export type CreateCodeBlock = DeepPartial<CodeBlock> & {
  type: typeof BlockElementType.CODE;
  name: string;
  content: string;
};

export type CodeBlock = zod.infer<typeof CodeBlockSchema>;

export type CodeBlockConfiguration = zod.infer<
  typeof CodeBlockConfigurationSchema
>;

/////////////
// Schemas //
/////////////

export const CodeBlockConfigurationSchema = BaseBlockConfigurationSchema; // no additional configuration

export const CodeBlockSchema = BaseBlockSchema.extend({
  type: zod.literal(BlockElementType.CODE),
  content: zod.string().min(1),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  configuration: CodeBlockConfigurationSchema.default({}),
});
