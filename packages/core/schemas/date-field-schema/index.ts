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

export type CreateDateField = DeepPartial<DateField> & {
  type: typeof FieldElementType.DATE;
  name: string;
};

export type DateField = zod.infer<typeof DateFieldSchema>;

export type DateFieldConfiguration = zod.infer<
  typeof DateFieldConfigurationSchema
>;

export type DateFieldRules = zod.infer<typeof DateFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const DateFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const DateFieldRulesSchema = BaseFieldRulesSchema.extend({
  minDate: zod.date().nullable().default(null),
  maxDate: zod.date().nullable().default(null),
});

export const DateFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.DATE),
  label: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.date().nullable().default(null),
  configuration: DateFieldConfigurationSchema.default({}),
  rules: DateFieldRulesSchema.default({}),
});
