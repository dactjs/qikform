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

export type CreateDateTimeField = DeepPartial<DateTimeField> & {
  type: typeof FieldElementType.DATE_TIME;
  name: string;
};

export type DateTimeField = zod.infer<typeof DateTimeFieldSchema>;

export type DateTimeFieldConfiguration = zod.infer<
  typeof DateTimeFieldConfigurationSchema
>;

export type DateTimeFieldRules = zod.infer<typeof DateTimeFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const DateTimeFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const DateTimeFieldRulesSchema = BaseFieldRulesSchema.extend({
  minDateTime: zod.date().nullable().default(null),
  maxDateTime: zod.date().nullable().default(null),
});

export const DateTimeFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.DATE_TIME),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.date().nullable().default(null),
  configuration: DateTimeFieldConfigurationSchema.default({}),
  rules: DateTimeFieldRulesSchema.default({}),
});
