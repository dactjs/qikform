import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const SwitchFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const SwitchFieldRulesSchema = BaseFieldRulesSchema; // no additional rules

export const SwitchFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.SWITCH),
  label: zod.string().min(1),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.boolean().nullable().default(null),
  configuration: SwitchFieldConfigurationSchema.default({}),
  rules: SwitchFieldRulesSchema.default({}),
});
