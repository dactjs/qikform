import { z as zod } from "zod";

import { FieldElementType } from "../../constants";
import type { DeepPartial } from "../../types";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base-field-schema";

///////////
// Types //
///////////

export type CreateRichTextField = DeepPartial<RichTextField> & {
  type: typeof FieldElementType.RICH_TEXT;
  name: string;
};

export type RichTextField = zod.infer<typeof RichTextFieldSchema>;

export type RichTextFieldConfiguration = zod.infer<
  typeof RichTextFieldConfigurationSchema
>;

export type RichTextFieldRules = zod.infer<typeof RichTextFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const RichTextFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const RichTextFieldRulesSchema = BaseFieldRulesSchema.extend({
  maxCharacters: zod.number().nullable().default(null),
});

export const RichTextFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.RICH_TEXT),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.string().nullable().default(null),
  configuration: RichTextFieldConfigurationSchema.default({}),
  rules: RichTextFieldRulesSchema.default({}),
});
