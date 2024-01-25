import type { z as zod } from "zod";

import type { DeepPartial } from "../../../../types";

import type { FieldElementType } from "../../constants";

import type {
  PlainTextFieldSchema,
  PlainTextFieldConfigurationSchema,
  PlainTextFieldRulesSchema,
} from "./schema";

export type CreatePlainTextField = DeepPartial<PlainTextField> & {
  type: typeof FieldElementType.PLAIN_TEXT;
  name: string;
};

export type PlainTextField = zod.infer<typeof PlainTextFieldSchema>;

export type PlainTextFieldConfiguration = zod.infer<
  typeof PlainTextFieldConfigurationSchema
>;

export type PlainTextFieldRules = zod.infer<typeof PlainTextFieldRulesSchema>;
