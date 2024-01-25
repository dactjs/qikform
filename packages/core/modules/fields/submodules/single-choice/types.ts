import type { z as zod } from "zod";

import type { DeepPartial } from "../../../../types";

import type { FieldElementType } from "../../constants";

import type {
  SingleChoiceFieldSchema,
  SingleChoiceFieldConfigurationSchema,
  SingleChoiceFieldRulesSchema,
} from "./schema";

export type CreateSingleChoiceField = DeepPartial<SingleChoiceField> & {
  type: typeof FieldElementType.SINGLE_CHOICE;
  name: string;
  label: string;
  options: string[];
};

export type SingleChoiceField = zod.infer<typeof SingleChoiceFieldSchema>;

export type SingleChoiceFieldConfiguration = zod.infer<
  typeof SingleChoiceFieldConfigurationSchema
>;

export type SingleChoiceFieldRules = zod.infer<
  typeof SingleChoiceFieldRulesSchema
>;
