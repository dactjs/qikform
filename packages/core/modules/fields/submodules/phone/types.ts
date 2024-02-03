import type { z as zod } from "zod";

import type { DeepPartial } from "@/types";

import type { FieldElementType } from "../../constants";

import type {
  PhoneSchema,
  PhoneFieldSchema,
  PhoneFieldConfigurationSchema,
  PhoneFieldRulesSchema,
} from "./schema";

export type CreatePhoneField = DeepPartial<PhoneField> & {
  type: typeof FieldElementType.PHONE;
  name: string;
};

export type Phone = zod.infer<typeof PhoneSchema>;

export type PhoneField = zod.infer<typeof PhoneFieldSchema>;

export type PhoneFieldConfiguration = zod.infer<
  typeof PhoneFieldConfigurationSchema
>;

export type PhoneFieldRules = zod.infer<typeof PhoneFieldRulesSchema>;
