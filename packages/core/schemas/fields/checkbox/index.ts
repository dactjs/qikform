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

export type CreateCheckboxField = DeepPartial<CheckboxField> & {
  type: typeof FieldElementType.CHECKBOX;
  name: string;
};

export type CheckboxField = zod.infer<typeof CheckboxFieldSchema>;

export type CheckboxFieldConfiguration = zod.infer<
  typeof CheckboxFieldConfigurationSchema
>;

export type CheckboxFieldRules = zod.infer<typeof CheckboxFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const CheckboxFieldConfigurationSchema =
  BaseFieldConfigurationSchema.extend({
    // no additional configuration
  });

export const CheckboxFieldRulesSchema = BaseFieldRulesSchema.extend({
  // no additional rules
});

export const CheckboxFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.CHECKBOX),
  defaultValue: zod.boolean().nullable().default(null),
  configuration: CheckboxFieldConfigurationSchema.default({}),
  rules: CheckboxFieldRulesSchema.default({}),
}).omit({ placeholder: true });
