import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { BlockElementType } from "../../constants";

import type { TextBlockSchema, TextBlockConfigurationSchema } from "./schema";

export type CreateTextBlock = DeepPartial<TextBlock> & {
  type: typeof BlockElementType.TEXT;
  name: string;
  content: string;
};

export type TextBlock = zod.infer<typeof TextBlockSchema>;

export type TextBlockConfiguration = zod.infer<
  typeof TextBlockConfigurationSchema
>;
