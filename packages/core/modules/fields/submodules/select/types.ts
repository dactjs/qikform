import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { FieldElementType } from "../../constants";

import type {
  SelectFieldSchema,
  SelectFieldConfigurationSchema,
  SelectFieldRulesSchema,
} from "./schema";

export type CreateSelectField = DeepPartial<SelectField> & {
  type: typeof FieldElementType.SELECT;
  name: string;
  options: string[];
};

export type SelectField = zod.infer<typeof SelectFieldSchema>;

export type SelectFieldConfiguration = zod.infer<
  typeof SelectFieldConfigurationSchema
>;

export type SelectFieldRules = zod.infer<typeof SelectFieldRulesSchema>;
