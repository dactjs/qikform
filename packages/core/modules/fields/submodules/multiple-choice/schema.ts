import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const MultipleChoiceFieldConfigurationSchema =
  BaseFieldConfigurationSchema; // no additional configuration

export const MultipleChoiceFieldRulesSchema = BaseFieldRulesSchema; // no additional rules

export const MultipleChoiceFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.MULTIPLE_CHOICE),
  label: zod.string().min(1),
  helperText: zod.string().min(1).nullable().default(null),
  options: zod.string().min(1).array().min(1).default([]),
  defaultValue: zod.string().array().nullable().default(null),
  configuration: MultipleChoiceFieldConfigurationSchema.default({}),
  rules: MultipleChoiceFieldRulesSchema.default({}),
}).refine(
  ({ options, defaultValue }) => {
    if (defaultValue === null) return true;

    return defaultValue.every((option) => options.includes(option));
  },
  {
    path: ["defaultValue"],
    message: "Default value must be one of the options",
  },
);
