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

export type CreateMultipleChoiceField = DeepPartial<MultipleChoiceField> & {
  type: typeof FieldElementType.MULTIPLE_CHOICE;
  name: string;
};

export type MultipleChoiceField = zod.infer<typeof MultipleChoiceFieldSchema>;

export type MultipleChoiceFieldConfiguration = zod.infer<
  typeof MultipleChoiceFieldConfigurationSchema
>;

export type MultipleChoiceFieldRules = zod.infer<
  typeof MultipleChoiceFieldRulesSchema
>;

/////////////
// Schemas //
/////////////

export const MultipleChoiceFieldConfigurationSchema =
  BaseFieldConfigurationSchema.extend({
    // no additional configuration
  });

export const MultipleChoiceFieldRulesSchema = BaseFieldRulesSchema.extend({
  // no additional rules
});

export const MultipleChoiceFieldSchema = BaseFieldSchema.omit({
  label: true,
  placeholder: true,
})
  .extend({
    type: zod.literal(FieldElementType.MULTIPLE_CHOICE),
    label: zod.string().min(1),
    options: zod.string().min(1).array().min(1).default([]),
    defaultValue: zod.string().array().nullable().default(null),
    configuration: MultipleChoiceFieldConfigurationSchema.default({}),
    rules: MultipleChoiceFieldRulesSchema.default({}),
  })
  .refine(
    ({ options, defaultValue }) =>
      defaultValue === null ||
      options.every((option) => defaultValue.includes(option)),
    {
      message: "Default value must be one of the options",
      path: ["defaultValue"],
    }
  );
