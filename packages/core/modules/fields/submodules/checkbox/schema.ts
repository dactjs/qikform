import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

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
