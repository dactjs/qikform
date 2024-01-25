import type { z as zod } from "zod";

import type {
  CreatePlainTextField,
  CreateRichTextField,
  CreateNumberField,
  CreateEmailField,
  CreatePhoneField,
  CreateURLField,
  CreateCheckboxField,
  CreateSwitchField,
  CreateSingleChoiceField,
  CreateMultipleChoiceField,
  CreateSelectField,
  CreateTimeField,
  CreateDateField,
  CreateDateTimeField,
} from "./submodules";

import type { FieldElementSchema } from "./schema";

export type CreateFieldElement =
  | CreatePlainTextField
  | CreateRichTextField
  | CreateNumberField
  | CreateEmailField
  | CreatePhoneField
  | CreateURLField
  | CreateCheckboxField
  | CreateSwitchField
  | CreateSingleChoiceField
  | CreateMultipleChoiceField
  | CreateSelectField
  | CreateTimeField
  | CreateDateField
  | CreateDateTimeField;

export type FieldElement = zod.infer<typeof FieldElementSchema>;
