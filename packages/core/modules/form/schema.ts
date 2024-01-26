import { z as zod } from "zod";

import { BlockElementSchema } from "../blocks";
import { FieldElementSchema } from "../fields";

export const FormElementSchema = zod.union([
  BlockElementSchema,
  FieldElementSchema,
]);

export const FormCustomizationSchema = zod.object({
  hideTitle: zod.boolean().default(false),
  hideDescription: zod.boolean().default(false),
  disablePadding: zod.boolean().default(false),
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
