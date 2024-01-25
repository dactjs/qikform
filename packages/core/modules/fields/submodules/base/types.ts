import type { z as zod } from "zod";

import type {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "./schema";

export type BaseField = zod.infer<typeof BaseFieldSchema>;

export type BaseFieldConfiguration = zod.infer<
  typeof BaseFieldConfigurationSchema
>;

export type BaseFieldRules = zod.infer<typeof BaseFieldRulesSchema>;
