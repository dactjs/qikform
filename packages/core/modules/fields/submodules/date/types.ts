import type { z as zod } from "zod";

import type { DeepPartial } from "../../../../types";

import type { FieldElementType } from "../../constants";

import type {
  DateFieldSchema,
  DateFieldConfigurationSchema,
  DateFieldRulesSchema,
} from "./schema";

export type CreateDateField = DeepPartial<DateField> & {
  type: typeof FieldElementType.DATE;
  name: string;
};

export type DateField = zod.infer<typeof DateFieldSchema>;

export type DateFieldConfiguration = zod.infer<
  typeof DateFieldConfigurationSchema
>;

export type DateFieldRules = zod.infer<typeof DateFieldRulesSchema>;
