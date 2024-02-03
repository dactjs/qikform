import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { FieldElementType } from "../../constants";

import type {
  NumberFieldSchema,
  NumberFieldConfigurationSchema,
  NumberFieldRulesSchema,
} from "./schema";

export type CreateNumberField = DeepPartial<NumberField> & {
  type: typeof FieldElementType.NUMBER;
  name: string;
};

export type NumberField = zod.infer<typeof NumberFieldSchema>;

export type NumberFieldConfiguration = zod.infer<
  typeof NumberFieldConfigurationSchema
>;

export type NumberFieldRules = zod.infer<typeof NumberFieldRulesSchema>;
