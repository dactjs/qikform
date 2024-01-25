import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const NumberFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const NumberFieldRulesSchema = BaseFieldRulesSchema.extend({
  min: zod.number().nullable().default(null),
  max: zod.number().nullable().default(null),
}).refine(
  ({ min, max }) => {
    if (min === null || max === null) return true;

    return min <= max;
  },
  {
    path: ["min"],
    message:
      "The minimum number must be less than or equal to the maximum number",
  }
);

export const NumberFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.NUMBER),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.number().nullable().default(null),
  configuration: NumberFieldConfigurationSchema.default({}),
  rules: NumberFieldRulesSchema.default({}),
}).refine(
  ({ defaultValue, rules }) => {
    if (defaultValue === null) return true;

    if (rules.min) {
      return defaultValue >= rules.min;
    }

    if (rules.max) {
      return defaultValue <= rules.max;
    }

    return true;
  },
  {
    path: ["defaultValue"],
    message: "The default value must be between the minimum and maximum number",
  }
);
