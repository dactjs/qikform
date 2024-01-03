import { z as zod } from "zod";

import type { CreatePlainTextField } from "../plain-text-field-schema";
import { PlainTextFieldSchema } from "../plain-text-field-schema";

import type { CreateRichTextField } from "../rich-text-field-schema";
import { RichTextFieldSchema } from "../rich-text-field-schema";

import type { CreateNumberField } from "../number-field-schema";
import { NumberFieldSchema } from "../number-field-schema";

import type { CreateEmailField } from "../email-field-schema";
import { EmailFieldSchema } from "../email-field-schema";

import type { CreatePhoneField } from "../phone-field-schema";
import { PhoneFieldSchema } from "../phone-field-schema";

import type { CreateCheckboxField } from "../checkbox-field-schema";
import { CheckboxFieldSchema } from "../checkbox-field-schema";

import type { CreateSwitchField } from "../switch-field-schema";
import { SwitchFieldSchema } from "../switch-field-schema";

import type { CreateSingleChoiceField } from "../single-choice-field-schema";
import { SingleChoiceFieldSchema } from "../single-choice-field-schema";

import type { CreateMultipleChoiceField } from "../multiple-choice-field-schema";
import { MultipleChoiceFieldSchema } from "../multiple-choice-field-schema";

import type { CreateTimeField } from "../time-field-schema";
import { TimeFieldSchema } from "../time-field-schema";

import type { CreateDateField } from "../date-field-schema";
import { DateFieldSchema } from "../date-field-schema";

import type { CreateDateTimeField } from "../date-time-field-schema";
import { DateTimeFieldSchema } from "../date-time-field-schema";

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
  | CreateSingleChoiceField
  | CreateMultipleChoiceField
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
  SingleChoiceFieldSchema,
  MultipleChoiceFieldSchema,
  TimeFieldSchema,
  DateFieldSchema,
  DateTimeFieldSchema,
]);
