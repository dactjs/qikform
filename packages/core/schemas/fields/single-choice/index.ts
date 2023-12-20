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

export type CreateSingleChoiceField = DeepPartial<SingleChoiceField> & {
  type: typeof FieldElementType.SINGLE_CHOICE;
  name: string;
};

export type SingleChoiceField = zod.infer<typeof SingleChoiceFieldSchema>;

export type SingleChoiceFieldConfiguration = zod.infer<
  typeof SingleChoiceFieldConfigurationSchema
>;

export type SingleChoiceFieldRules = zod.infer<
  typeof SingleChoiceFieldRulesSchema
>;

/////////////
// Schemas //
/////////////

export const SingleChoiceFieldConfigurationSchema =
  BaseFieldConfigurationSchema.extend({
    // no additional configuration
  });

export const SingleChoiceFieldRulesSchema = BaseFieldRulesSchema.extend({
  // no additional rules
});

export const SingleChoiceFieldSchema = BaseFieldSchema.omit({
  label: true,
  placeholder: true,
})
  .extend({
    type: zod.literal(FieldElementType.SINGLE_CHOICE),
    label: zod.string().min(1),
    options: zod.string().min(1).array().min(1).default([]),
    defaultValue: zod.string().nullable().default(null),
    configuration: SingleChoiceFieldConfigurationSchema.default({}),
    rules: SingleChoiceFieldRulesSchema.default({}),
  })
  .refine(
    ({ options, defaultValue }) =>
      defaultValue === null || options.includes(defaultValue),
    {
      message: "Default value must be one of the options",
      path: ["defaultValue"],
    }
  );
