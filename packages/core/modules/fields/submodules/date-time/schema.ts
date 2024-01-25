import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

export const DateTimeFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const DateTimeFieldRulesSchema = BaseFieldRulesSchema.extend({
  minDateTime: zod.date().nullable().default(null),
  maxDateTime: zod.date().nullable().default(null),
}).refine(
  ({ minDateTime, maxDateTime }) => {
    if (minDateTime === null || maxDateTime === null) return true;

    return minDateTime <= maxDateTime;
  },
  {
    path: ["minDateTime"],
    message:
      "The minimum date/time must be less than or equal to the maximum date/time",
  }
);

export const DateTimeFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.DATE_TIME),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.date().nullable().default(null),
  configuration: DateTimeFieldConfigurationSchema.default({}),
  rules: DateTimeFieldRulesSchema.default({}),
}).refine(
  ({ defaultValue, rules }) => {
    if (defaultValue === null) return true;

    if (rules.minDateTime) {
      return defaultValue >= rules.minDateTime;
    }

    if (rules.maxDateTime) {
      return defaultValue <= rules.maxDateTime;
    }

    return true;
  },
  {
    path: ["defaultValue"],
    message:
      "The default value must be between the minimum and maximum date/time",
  }
);
