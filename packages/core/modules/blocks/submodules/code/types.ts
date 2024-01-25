import type { z as zod } from "zod";

import type { DeepPartial } from "../../../../types";

import type { BlockElementType } from "../../constants";

import type { CodeBlockSchema, CodeBlockConfigurationSchema } from "./schema";

export type CreateCodeBlock = DeepPartial<CodeBlock> & {
  type: typeof BlockElementType.CODE;
  name: string;
  content: string;
};

export type CodeBlock = zod.infer<typeof CodeBlockSchema>;

export type CodeBlockConfiguration = zod.infer<
  typeof CodeBlockConfigurationSchema
>;
