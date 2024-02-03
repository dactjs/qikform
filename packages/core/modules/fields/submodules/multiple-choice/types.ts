import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { FieldElementType } from "../../constants";

import type {
  MultipleChoiceFieldSchema,
  MultipleChoiceFieldConfigurationSchema,
  MultipleChoiceFieldRulesSchema,
} from "./schema";

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
