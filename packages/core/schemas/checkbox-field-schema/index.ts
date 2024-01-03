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

export type CreateCheckboxField = DeepPartial<CheckboxField> & {
  type: typeof FieldElementType.CHECKBOX;
  name: string;
  label: string;
};

export type CheckboxField = zod.infer<typeof CheckboxFieldSchema>;

export type CheckboxFieldConfiguration = zod.infer<
  typeof CheckboxFieldConfigurationSchema
>;

export type CheckboxFieldRules = zod.infer<typeof CheckboxFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const CheckboxFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const CheckboxFieldRulesSchema = BaseFieldRulesSchema; // no additional rules

export const CheckboxFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.CHECKBOX),
  label: zod.string().min(1),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.boolean().nullable().default(null),
  configuration: CheckboxFieldConfigurationSchema.default({}),
  rules: CheckboxFieldRulesSchema.default({}),
});
