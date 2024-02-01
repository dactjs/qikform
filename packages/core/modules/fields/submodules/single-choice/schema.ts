import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const SingleChoiceFieldConfigurationSchema =
  BaseFieldConfigurationSchema; // no additional configuration

export const SingleChoiceFieldRulesSchema = BaseFieldRulesSchema; // no additional rules

export const SingleChoiceFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.SINGLE_CHOICE),
  label: zod.string().min(1),
  helperText: zod.string().min(1).nullable().default(null),
  options: zod.string().min(1).array().min(1).default([]),
  defaultValue: zod.string().nullable().default(null),
  configuration: SingleChoiceFieldConfigurationSchema.default({}),
  rules: SingleChoiceFieldRulesSchema.default({}),
}).refine(
  ({ options, defaultValue }) => {
    if (defaultValue === null) return true;

    return options.includes(defaultValue);
  },
  {
    path: ["defaultValue"],
    message: "Default value must be one of the options",
  },
);
