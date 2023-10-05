import { z as zod } from "zod";

import { FormElementCategory } from "../../../constants";

///////////
// Types //
///////////

export type BaseField = zod.infer<typeof BaseFieldSchema>;

export type BaseFieldConfiguration = zod.infer<
  typeof BaseFieldConfigurationSchema
>;

export type BaseFieldRules = zod.infer<typeof BaseFieldRulesSchema>;

/////////////
// Schemas //
/////////////

export const BaseFieldSchema = zod.object({
  id: zod
    .string()
    .uuid()
    .default(() => globalThis.crypto.randomUUID()),

  category: zod
    .literal(FormElementCategory.FIELD)
    .default(FormElementCategory.FIELD),

  name: zod
    .string()
    .min(1)
    .regex(/^[0-9a-zA-Z_]+$/),

  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
});

export const BaseFieldConfigurationSchema = zod.object({
  hidden: zod.boolean().default(false),
});

export const BaseFieldRulesSchema = zod.object({
  required: zod.boolean().default(false),
});
