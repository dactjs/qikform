import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const PlainTextFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const PlainTextFieldRulesSchema = BaseFieldRulesSchema.extend({
  minLength: zod.number().int().positive().nullable().default(null),
  maxLength: zod.number().int().positive().nullable().default(null),
}).refine(
  ({ minLength, maxLength }) => {
    if (minLength === null || maxLength === null) return true;

    return minLength <= maxLength;
  },
  {
    path: ["minLength"],
    message:
      "The minimum length must be less than or equal to the maximum length",
  },
);

export const PlainTextFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.PLAIN_TEXT),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.string().min(1).nullable().default(null),
  configuration: PlainTextFieldConfigurationSchema.default({}),
  rules: PlainTextFieldRulesSchema.default({}),
}).refine(
  ({ defaultValue, rules }) => {
    if (defaultValue === null) return true;

    if (rules.minLength) {
      return defaultValue.length >= rules.minLength;
    }

    if (rules.maxLength) {
      return defaultValue.length <= rules.maxLength;
    }

    return true;
  },
  {
    path: ["defaultValue"],
    message: "The default value must be between the minimum and maximum length",
  },
);
