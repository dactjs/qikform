import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

import {
  EMAIL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL,
  EMAIL_FIELD_ALLOWED_DOMAIN_REGEX,
} from "./constants";

export const EmailFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const EmailFieldRulesSchema = BaseFieldRulesSchema.extend({
  allowedDomains: zod
    .union([
      zod.string().min(1).regex(EMAIL_FIELD_ALLOWED_DOMAIN_REGEX).array(),
      zod.literal(EMAIL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL),
    ])
    .default(EMAIL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL)
    .transform((value) =>
      Array.isArray(value) && value.length === 0
        ? EMAIL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL
        : value,
    ),
});

export const EmailFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.EMAIL),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.string().email().nullable().default(null),
  configuration: EmailFieldConfigurationSchema.default({}),
  rules: EmailFieldRulesSchema.default({}),
}).refine(
  ({ defaultValue, rules }) => {
    if (defaultValue === null) return true;

    if (rules.allowedDomains === EMAIL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL)
      return true;

    const [, domain] = defaultValue.split("@");

    return rules.allowedDomains.includes(domain);
  },
  {
    path: ["defaultValue"],
    message: "Default value must be one of the allowed domains",
  },
);
