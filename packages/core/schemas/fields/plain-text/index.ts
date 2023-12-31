import { z as zod } from "zod";

import { FieldElementType } from "../../../constants";
import type { DeepPartial } from "../../../types";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

///////////
// Types //
///////////

export type CreatePlainTextField = DeepPartial<PlainTextField> & {
  type: typeof FieldElementType.PLAIN_TEXT;
  name: string;
};

export type PlainTextField = zod.infer<typeof PlainTextFieldSchema>;

export type PlainTextFieldConfiguration = zod.infer<
  typeof PlainTextFieldConfigurationSchema
>;

export type PlainTextFieldRules = zod.infer<typeof PlainTextFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const PlainTextFieldConfigurationSchema =
  BaseFieldConfigurationSchema.extend({
    // no additional configuration
  });

export const PlainTextFieldRulesSchema = BaseFieldRulesSchema.extend({
  minLength: zod.number().nullable().default(null),
  maxLength: zod.number().nullable().default(null),
});

export const PlainTextFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.PLAIN_TEXT),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.string().nullable().default(null),
  configuration: PlainTextFieldConfigurationSchema.default({}),
  rules: PlainTextFieldRulesSchema.default({}),
});
