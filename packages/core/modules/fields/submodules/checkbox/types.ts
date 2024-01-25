import type { z as zod } from "zod";

import type { DeepPartial } from "../../../../types";

import type { FieldElementType } from "../../constants";

import type {
  CheckboxFieldSchema,
  CheckboxFieldConfigurationSchema,
  CheckboxFieldRulesSchema,
} from "./schema";

export type CreateCheckboxField = DeepPartial<CheckboxField> & {
  type: typeof FieldElementType.CHECKBOX;
  name: string;
  label: string;
};

export type CheckboxField = zod.infer<typeof CheckboxFieldSchema>;

export type CheckboxFieldConfiguration = zod.infer<
  typeof CheckboxFieldConfigurationSchema
>;

export type CheckboxFieldRules = zod.infer<typeof CheckboxFieldRulesSchema>;
