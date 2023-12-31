import { z as zod } from "zod";

import { FieldElementType } from "../../constants";
import type { DeepPartial } from "../../types";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base-field-schema";

///////////
// Types //
///////////

export type CreateTimeField = DeepPartial<TimeField> & {
  type: typeof FieldElementType.TIME;
  name: string;
};

export type TimeField = zod.infer<typeof TimeFieldSchema>;

export type TimeFieldConfiguration = zod.infer<
  typeof TimeFieldConfigurationSchema
>;

export type TimeFieldRules = zod.infer<typeof TimeFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const TimeFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const TimeFieldRulesSchema = BaseFieldRulesSchema.extend({
  minTime: zod.date().nullable().default(null),
  maxTime: zod.date().nullable().default(null),
});

export const TimeFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.TIME),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.date().nullable().default(null),
  configuration: TimeFieldConfigurationSchema.default({}),
  rules: TimeFieldRulesSchema.default({}),
});
