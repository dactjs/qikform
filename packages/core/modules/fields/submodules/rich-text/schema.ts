import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const RichTextFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const RichTextFieldRulesSchema = BaseFieldRulesSchema.extend({
  maxCharacters: zod.number().int().positive().nullable().default(null),
});

export const RichTextFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.RICH_TEXT),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.string().min(1).nullable().default(null),
  configuration: RichTextFieldConfigurationSchema.default({}),
  rules: RichTextFieldRulesSchema.default({}),
});
