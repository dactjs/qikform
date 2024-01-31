import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const TimeFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const TimeFieldRulesSchema = BaseFieldRulesSchema.extend({
  minTime: zod.date().nullable().default(null),
  maxTime: zod.date().nullable().default(null),
}).refine(
  ({ minTime, maxTime }) => {
    if (minTime === null || maxTime === null) return true;

    const min = new Date(minTime);
    const max = new Date(maxTime);

    min.setFullYear(2000, 0, 1);
    max.setFullYear(2000, 0, 1);

    return min <= max;
  },
  {
    path: ["minTime"],
    message: "The minimum time must be less than or equal to the maximum time",
  }
);

export const TimeFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.TIME),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.date().nullable().default(null),
  configuration: TimeFieldConfigurationSchema.default({}),
  rules: TimeFieldRulesSchema.default({}),
}).refine(
  ({ defaultValue, rules }) => {
    if (defaultValue === null) return true;

    if (rules.minTime) {
      const min = new Date(rules.minTime);

      min.setFullYear(2000, 0, 1);

      return defaultValue >= min;
    }

    if (rules.maxTime) {
      const max = new Date(rules.maxTime);

      max.setFullYear(2000, 0, 1);

      return defaultValue <= max;
    }

    return true;
  },
  {
    path: ["defaultValue"],
    message: "The default value must be between the minimum and maximum time",
  }
);
