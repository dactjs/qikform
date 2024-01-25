import type { z as zod } from "zod";

import type { DeepPartial } from "../../../../types";

import type { FieldElementType } from "../../constants";

import type {
  URLFieldSchema,
  URLFieldConfigurationSchema,
  URLFieldRulesSchema,
} from "./schema";

export type CreateURLField = DeepPartial<URLField> & {
  type: typeof FieldElementType.URL;
  name: string;
};

export type URLField = zod.infer<typeof URLFieldSchema>;

export type URLFieldConfiguration = zod.infer<
  typeof URLFieldConfigurationSchema
>;

export type URLFieldRules = zod.infer<typeof URLFieldRulesSchema>;
