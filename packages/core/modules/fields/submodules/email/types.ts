import type { z as zod } from "zod";

import type { DeepPartial } from "../../../../types";

import type { FieldElementType } from "../../constants";

import type {
  EmailFieldSchema,
  EmailFieldConfigurationSchema,
  EmailFieldRulesSchema,
} from "./schema";

export type CreateEmailField = DeepPartial<EmailField> & {
  type: typeof FieldElementType.EMAIL;
  name: string;
};

export type EmailField = zod.infer<typeof EmailFieldSchema>;

export type EmailFieldConfiguration = zod.infer<
  typeof EmailFieldConfigurationSchema
>;

export type EmailFieldRules = zod.infer<typeof EmailFieldRulesSchema>;
