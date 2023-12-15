import { z as zod } from "zod";

import { FieldElementType } from "../../../constants";
import type { DeepPartial } from "../../../types";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

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

export const DateTimeFieldConfigurationSchema =
  BaseFieldConfigurationSchema.extend({
    // no additional configuration
  });

export const DateTimeFieldRulesSchema = BaseFieldRulesSchema.extend({
  minDateTime: zod.date().nullable().default(null),
  maxDateTime: zod.date().nullable().default(null),
});

export const DateTimeFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.DATE_TIME),
  defaultValue: zod.date().nullable().default(null),
  configuration: DateTimeFieldConfigurationSchema.default({}),
  rules: DateTimeFieldRulesSchema.default({}),
}).omit({ placeholder: true });
