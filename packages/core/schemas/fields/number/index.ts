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

export type CreateNumberField = DeepPartial<NumberField> & {
  type: typeof FieldElementType.NUMBER;
  name: string;
};

export type NumberField = zod.infer<typeof NumberFieldSchema>;

export type NumberFieldConfiguration = zod.infer<
  typeof NumberFieldConfigurationSchema
>;

export type NumberFieldRules = zod.infer<typeof NumberFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const NumberFieldConfigurationSchema =
  BaseFieldConfigurationSchema.extend({
    // no additional configuration
  });

export const NumberFieldRulesSchema = BaseFieldRulesSchema.extend({
  min: zod.number().nullable().default(null),
  max: zod.number().nullable().default(null),
});

export const NumberFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.NUMBER),
  defaultValue: zod.number().nullable().default(null),
  configuration: NumberFieldConfigurationSchema.default({}),
  rules: NumberFieldRulesSchema.default({}),
});
