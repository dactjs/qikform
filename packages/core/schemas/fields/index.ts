import { z as zod } from "zod";

import type { CreatePlainTextField } from "./plain-text";
import { PlainTextFieldSchema } from "./plain-text";

import type { CreateRichTextField } from "./rich-text";
import { RichTextFieldSchema } from "./rich-text";

import type { CreateNumberField } from "./number";
import { NumberFieldSchema } from "./number";

///////////
// Types //
///////////

export type CreateFieldElement =
  | CreatePlainTextField
  | CreateRichTextField
  | CreateNumberField;

export type FieldElement = zod.infer<typeof FieldElementSchema>;

/////////////
// Schemas //
/////////////

export const FieldElementSchema = zod.union([
  PlainTextFieldSchema,
  RichTextFieldSchema,
  NumberFieldSchema,
]);

////////////////
// Re-exports //
////////////////

export * from "./base";
export * from "./plain-text";
export * from "./rich-text";
export * from "./number";
