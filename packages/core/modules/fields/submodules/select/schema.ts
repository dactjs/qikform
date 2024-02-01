import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const SelectFieldConfigurationSchema =
  BaseFieldConfigurationSchema.extend({
    multiple: zod.boolean().default(false),
  });

export const SelectFieldRulesSchema = BaseFieldRulesSchema; // no additional rules

export const SelectFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.SELECT),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  options: zod.string().min(1).array().min(1).default([]),
  defaultValue: zod
    .union([zod.string(), zod.string().array()])
    .nullable()
    .default(null),

  configuration: SelectFieldConfigurationSchema.default({}),
  rules: SelectFieldRulesSchema.default({}),
}).refine(
  ({ configuration, options, defaultValue }) => {
    if (defaultValue === null) return true;

    if (!configuration.multiple && typeof defaultValue === "string")
      return options.includes(defaultValue);

    if (configuration.multiple && Array.isArray(defaultValue))
      return defaultValue.every((option) => options.includes(option));

    return false;
  },
  {
    path: ["defaultValue"],
    message: "Default value must be one of the options",
  },
);
