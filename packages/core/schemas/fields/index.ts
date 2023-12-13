import { z as zod } from "zod";

import type { CreatePlainTextField } from "./plain-text";
import { PlainTextFieldSchema } from "./plain-text";

import type { CreateRichTextField } from "./rich-text";
import { RichTextFieldSchema } from "./rich-text";

import type { CreateNumberField } from "./number";
import { NumberFieldSchema } from "./number";

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
export * from "./time";
export * from "./date";
export * from "./date-time";
