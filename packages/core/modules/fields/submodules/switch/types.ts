import type { z as zod } from "zod";

import type { DeepPartial } from "../../../../types";

import type { FieldElementType } from "../../constants";

import type {
  SwitchFieldSchema,
  SwitchFieldConfigurationSchema,
  SwitchFieldRulesSchema,
} from "./schema";

export type CreateSwitchField = DeepPartial<SwitchField> & {
  type: typeof FieldElementType.SWITCH;
  name: string;
  label: string;
};

export type SwitchField = zod.infer<typeof SwitchFieldSchema>;

export type SwitchFieldConfiguration = zod.infer<
  typeof SwitchFieldConfigurationSchema
>;

export type SwitchFieldRules = zod.infer<typeof SwitchFieldRulesSchema>;
