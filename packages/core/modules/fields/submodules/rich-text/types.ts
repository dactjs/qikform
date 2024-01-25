import type { z as zod } from "zod";

import type { DeepPartial } from "../../../../types";

import type { FieldElementType } from "../../constants";

import type {
  RichTextFieldSchema,
  RichTextFieldConfigurationSchema,
  RichTextFieldRulesSchema,
} from "./schema";

export type CreateRichTextField = DeepPartial<RichTextField> & {
  type: typeof FieldElementType.RICH_TEXT;
  name: string;
};

export type RichTextField = zod.infer<typeof RichTextFieldSchema>;

export type RichTextFieldConfiguration = zod.infer<
  typeof RichTextFieldConfigurationSchema
>;

export type RichTextFieldRules = zod.infer<typeof RichTextFieldRulesSchema>;
