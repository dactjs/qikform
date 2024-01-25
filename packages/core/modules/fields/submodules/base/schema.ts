import { z as zod } from "zod";

import { BASE_FIELD_CATEGORY, BASE_FIELD_NAME_REGEX } from "./constants";

export const BaseFieldSchema = zod.object({
  id: zod
    .string()
    .uuid()
    .default(() => globalThis.crypto.randomUUID()),

  category: zod.literal(BASE_FIELD_CATEGORY).default(BASE_FIELD_CATEGORY),
  name: zod.string().min(1).regex(BASE_FIELD_NAME_REGEX),
});

export const BaseFieldConfigurationSchema = zod.object({
  hidden: zod.boolean().default(false),
});

export const BaseFieldRulesSchema = zod.object({
  required: zod.boolean().default(false),
});
