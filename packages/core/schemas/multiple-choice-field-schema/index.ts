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

export type CreateMultipleChoiceField = DeepPartial<MultipleChoiceField> & {
  type: typeof FieldElementType.MULTIPLE_CHOICE;
  name: string;
  label: string;
  options: string[];
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
  BaseFieldConfigurationSchema; // no additional configuration

export const MultipleChoiceFieldRulesSchema = BaseFieldRulesSchema; // no additional rules

export const MultipleChoiceFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.MULTIPLE_CHOICE),
  label: zod.string().min(1),
  helperText: zod.string().min(1).nullable().default(null),
  options: zod.string().min(1).array().min(1).default([]),
  defaultValue: zod.string().array().nullable().default(null),
  configuration: MultipleChoiceFieldConfigurationSchema.default({}),
  rules: MultipleChoiceFieldRulesSchema.default({}),
}).refine(
  ({ options, defaultValue }) =>
    defaultValue === null ||
    defaultValue.every((option) => options.includes(option)),
  {
    message: "Default value must be one of the options",
    path: ["defaultValue"],
  }
);
