import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const DateFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const DateFieldRulesSchema = BaseFieldRulesSchema.extend({
  minDate: zod.date().nullable().default(null),
  maxDate: zod.date().nullable().default(null),
}).refine(
  ({ minDate, maxDate }) => {
    if (minDate === null || maxDate === null) return true;

    const min = new Date(minDate);
    const max = new Date(maxDate);

    min.setHours(0, 0, 0, 0);
    max.setHours(0, 0, 0, 0);

    return min <= max;
  },
  {
    path: ["minDate"],
    message: "The minimum date must be less than or equal to the maximum date",
  },
);

export const DateFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.DATE),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.date().nullable().default(null),
  configuration: DateFieldConfigurationSchema.default({}),
  rules: DateFieldRulesSchema.default({}),
}).refine(
  ({ defaultValue, rules }) => {
    if (defaultValue === null) return true;

    if (rules.minDate) {
      const min = new Date(rules.minDate);

      min.setHours(0, 0, 0, 0);

      return defaultValue >= min;
    }

    if (rules.maxDate) {
      const max = new Date(rules.maxDate);

      max.setHours(0, 0, 0, 0);

      return defaultValue <= max;
    }

    return true;
  },
  {
    path: ["defaultValue"],
    message: "The default value must be between the minimum and maximum date",
  },
);
