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

export type CreateSwitchField = DeepPartial<SwitchField> & {
  type: typeof FieldElementType.SWITCH;
  name: string;
};

export type SwitchField = zod.infer<typeof SwitchFieldSchema>;

export type SwitchFieldConfiguration = zod.infer<
  typeof SwitchFieldConfigurationSchema
>;

export type SwitchFieldRules = zod.infer<typeof SwitchFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const SwitchFieldConfigurationSchema =
  BaseFieldConfigurationSchema.extend({
    // no additional configuration
  });

export const SwitchFieldRulesSchema = BaseFieldRulesSchema.extend({
  // no additional rules
});

export const SwitchFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.SWITCH),
  defaultValue: zod.boolean().nullable().default(null),
  configuration: SwitchFieldConfigurationSchema.default({}),
  rules: SwitchFieldRulesSchema.default({}),
}).omit({ placeholder: true });
