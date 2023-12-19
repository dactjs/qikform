import { z as zod } from "zod";

import type { CreatePlainTextField } from "./plain-text";
import { PlainTextFieldSchema } from "./plain-text";

import type { CreateRichTextField } from "./rich-text";
import { RichTextFieldSchema } from "./rich-text";

import type { CreateNumberField } from "./number";
import { NumberFieldSchema } from "./number";

import type { CreateEmailField } from "./email";
import { EmailFieldSchema } from "./email";

import type { CreatePhoneField } from "./phone";
import { PhoneFieldSchema } from "./phone";

import type { CreateCheckboxField } from "./checkbox";
import { CheckboxFieldSchema } from "./checkbox";

import type { CreateSwitchField } from "./switch";
import { SwitchFieldSchema } from "./switch";

import type { CreateTimeField } from "./time";
import { TimeFieldSchema } from "./time";

import type { CreateDateField } from "./date";
import { DateFieldSchema } from "./date";

import type { CreateDateTimeField } from "./date-time";
import { DateTimeFieldSchema } from "./date-time";

///////////
// Types //
///////////

export type CreateFieldElement =
  | CreatePlainTextField
  | CreateRichTextField
  | CreateNumberField
  | CreateEmailField
  | CreatePhoneField
  | CreateCheckboxField
  | CreateSwitchField
  | CreateTimeField
  | CreateDateField
  | CreateDateTimeField;

export type FieldElement = zod.infer<typeof FieldElementSchema>;

/////////////
// Schemas //
/////////////

export const FieldElementSchema = zod.union([
  PlainTextFieldSchema,
  RichTextFieldSchema,
  NumberFieldSchema,
  EmailFieldSchema,
  PhoneFieldSchema,
  CheckboxFieldSchema,
  SwitchFieldSchema,
  TimeFieldSchema,
  DateFieldSchema,
  DateTimeFieldSchema,
]);

////////////////
// Re-exports //
////////////////

export * from "./base";

export * from "./plain-text";
export * from "./rich-text";
export * from "./number";

export * from "./email";
export * from "./phone";

export * from "./checkbox";
export * from "./switch";

export * from "./time";
export * from "./date";
export * from "./date-time";
