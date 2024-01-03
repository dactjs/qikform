import { z as zod } from "zod";

import type { DeepPartial } from "../../types";

import { type CreateBlockElement } from "../block-schema";
import { BlockElementSchema } from "../block-schema";

import { type CreateFieldElement } from "../field-schema";
import { FieldElementSchema } from "../field-schema";

///////////
// Types //
///////////

export type CreateForm = DeepPartial<Form> & {
  title: string;
  elements: (CreateBlockElement | CreateFieldElement)[];
};

export type Form = zod.infer<typeof FormSchema>;

export type FormElement = zod.infer<typeof FormElementSchema>;

export type FormCustomization = zod.infer<typeof FormCustomizationSchema>;

/////////////
// Schemas //
/////////////

export const FormElementSchema = zod.union([
  BlockElementSchema,
  FieldElementSchema,
]);

export const FormCustomizationSchema = zod.object({
  disablePadding: zod.boolean().default(false),
  hideTitle: zod.boolean().default(false),
  hideDescription: zod.boolean().default(false),
  transparentBackground: zod.boolean().default(false),
  allowMultipleSubmissions: zod.boolean().default(false),
  fillAgainButtonText: zod.string().min(1).default("Fill Again"),
  submitButtonText: zod.string().min(1).default("Submit"),
  submissionText: zod
    .string()
    .min(1)
    .default("<p><strong>Thanks You! 🎊🎉</strong></p>"),
});

export const FormSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1).nullable().default(null),
  elements: FormElementSchema.array().default([]),
  customization: FormCustomizationSchema.default({}),
});
