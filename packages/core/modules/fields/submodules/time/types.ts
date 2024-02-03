import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { FieldElementType } from "../../constants";

import type {
  TimeFieldSchema,
  TimeFieldConfigurationSchema,
  TimeFieldRulesSchema,
} from "./schema";

export type CreateTimeField = DeepPartial<TimeField> & {
  type: typeof FieldElementType.TIME;
  name: string;
};

export type TimeField = zod.infer<typeof TimeFieldSchema>;

export type TimeFieldConfiguration = zod.infer<
  typeof TimeFieldConfigurationSchema
>;

export type TimeFieldRules = zod.infer<typeof TimeFieldRulesSchema>;
