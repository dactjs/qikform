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

export type CreatePhoneField = DeepPartial<PhoneField> & {
  type: typeof FieldElementType.PHONE;
  name: string;
};

export type PhoneField = zod.infer<typeof PhoneFieldSchema>;

export type PhoneFieldConfiguration = zod.infer<
  typeof PhoneFieldConfigurationSchema
>;

export type PhoneFieldRules = zod.infer<typeof PhoneFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const PhoneFieldConfigurationSchema =
  BaseFieldConfigurationSchema.extend({
    // no additional configuration
  });

export const PhoneFieldRulesSchema = BaseFieldRulesSchema.extend({
  // no additional rules
});

export const PhoneFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.PHONE),
  defaultValue: zod.string().nullable().default(null),
  configuration: PhoneFieldConfigurationSchema.default({}),
  rules: PhoneFieldRulesSchema.default({}),
});
