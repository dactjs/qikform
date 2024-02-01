import { z as zod } from "zod";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

import {
  URL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL,
  URL_FIELD_ALLOWED_DOMAIN_REGEX,
} from "./constants";

export const URLFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const URLFieldRulesSchema = BaseFieldRulesSchema.extend({
  allowedDomains: zod
    .union([
      zod.string().min(1).regex(URL_FIELD_ALLOWED_DOMAIN_REGEX).array(),
      zod.literal(URL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL),
    ])
    .default(URL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL)
    .transform((value) =>
      Array.isArray(value) && value.length === 0
        ? URL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL
        : value,
    ),
});

export const URLFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.URL),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: zod.string().url().nullable().default(null),
  configuration: URLFieldConfigurationSchema.default({}),
  rules: URLFieldRulesSchema.default({}),
}).refine(
  ({ defaultValue, rules }) => {
    if (defaultValue === null) return true;

    if (rules.allowedDomains === URL_FIELD_ALL_ALLOWED_DOMAINS_SYMBOL)
      return true;

    if (!URL.canParse(defaultValue)) return false;

    const url = new URL(defaultValue);

    return rules.allowedDomains.includes(url.hostname);
  },
  {
    path: ["defaultValue"],
    message: "Default value must be one of the allowed domains",
  },
);
