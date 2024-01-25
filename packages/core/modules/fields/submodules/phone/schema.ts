import { z as zod } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

import { FieldElementType } from "../../constants";

import {
  BaseFieldSchema,
  BaseFieldConfigurationSchema,
  BaseFieldRulesSchema,
} from "../base";

import {
  PhoneNumberType,
  PhoneCountryCode,
  UNKNOWN_PHONE_NUMBER_TYPE,
  UNKNOWN_PHONE_COUNTRY_CODE,
} from "./constants";

export const PhoneSchema = zod
  .object({
    type: zod.union([
      zod.enum(PhoneNumberType),
      zod.literal(UNKNOWN_PHONE_NUMBER_TYPE),
    ]),

    country: zod.union([
      zod.enum(PhoneCountryCode),
      zod.literal(UNKNOWN_PHONE_COUNTRY_CODE),
    ]),

    number: zod.string().min(1),
  })
  .refine(
    ({ country, number }) => {
      if (country === UNKNOWN_PHONE_COUNTRY_CODE) return true;

      return isValidPhoneNumber(number, country);
    },
    {
      path: ["number"],
      message: "Invalid phone number",
    }
  );

export const PhoneFieldConfigurationSchema = BaseFieldConfigurationSchema; // no additional configuration

export const PhoneFieldRulesSchema = BaseFieldRulesSchema; // no additional rules

export const PhoneFieldSchema = BaseFieldSchema.extend({
  type: zod.literal(FieldElementType.PHONE),
  label: zod.string().min(1).nullable().default(null),
  placeholder: zod.string().min(1).nullable().default(null),
  helperText: zod.string().min(1).nullable().default(null),
  defaultValue: PhoneSchema.nullable().default(null),
  configuration: PhoneFieldConfigurationSchema.default({}),
  rules: PhoneFieldRulesSchema.default({}),
});
