import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { FieldElementType } from "../../constants";

import type {
  DateTimeFieldSchema,
  DateTimeFieldConfigurationSchema,
  DateTimeFieldRulesSchema,
} from "./schema";

export type CreateDateTimeField = DeepPartial<DateTimeField> & {
  type: typeof FieldElementType.DATE_TIME;
  name: string;
};

export type DateTimeField = zod.infer<typeof DateTimeFieldSchema>;

export type DateTimeFieldConfiguration = zod.infer<
  typeof DateTimeFieldConfigurationSchema
>;

export type DateTimeFieldRules = zod.infer<typeof DateTimeFieldRulesSchema>;
