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

export type CreateEmailField = DeepPartial<EmailField> & {
  type: typeof FieldElementType.EMAIL;
  name: string;
};

export type EmailField = zod.infer<typeof EmailFieldSchema>;

export type EmailFieldConfiguration = zod.infer<
  typeof EmailFieldConfigurationSchema
>;

export type EmailFieldRules = zod.infer<typeof EmailFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const EmailFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const EmailFieldRulesSchema = BaseFieldRulesSchema; // no additional rules

export const EmailFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.EMAIL),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.string().email().nullable().default(null),
  configuration: EmailFieldConfigurationSchema.default({}),
  rules: EmailFieldRulesSchema.default({}),
});
