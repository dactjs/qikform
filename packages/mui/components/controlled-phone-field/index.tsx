"use client";

import { useState } from "react";
import type { MuiTelInputProps } from "mui-tel-input";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import type { UseControllerProps, FieldErrors } from "react-hook-form";
import { useController } from "react-hook-form";

import type { Phone, PhoneCountryCode } from "@qikform/core";
import {
  PhoneSchema,
  UNKNOWN_PHONE_NUMBER_TYPE,
  UNKNOWN_PHONE_COUNTRY_CODE,
} from "@qikform/core";

import { getPhonePlaceholderByCountryCode } from "./utils";

export interface ControlledPhoneFieldProps
  extends Omit<UseControllerProps<Record<string, unknown>>, "rules"> {
  required?: boolean;
  fullWidth?: boolean;
  size?: MuiTelInputProps["size"];
  label?: string | null;
  placeholder?: string | null;
  helperText?: string | null;
  defaultCountry?: PhoneCountryCode;
}

export function ControlledPhoneField({
  name,
  control,
  disabled,
  defaultValue,
  shouldUnregister,
  required,
  fullWidth,
  size,
  label,
  placeholder,
  helperText,
  defaultCountry = "US",
}: ControlledPhoneFieldProps): React.ReactElement {
  const {
    field: { value: state, onChange, ...params },
    fieldState: { error },
  } = useController({
    name,
    control,
    disabled,
    defaultValue,
    shouldUnregister,
    rules: {
      required: {
        value: Boolean(required),
        message: "Required",
      },
      validate: {
        matchIsValidTel: (phone) => {
          if (phone === null) return true;

          const result = PhoneSchema.safeParse(phone);

          if (!result.success) return "Invalid phone number";

          if (result.data.country === UNKNOWN_PHONE_COUNTRY_CODE) return true;

          const isValid = matchIsValidTel(result.data.number, {
            onlyCountries: [result.data.country],
          });

          return isValid || "Invalid phone number";
        },
      },
    },
  });

  const [phone, setPhone] = useState<{
    country: PhoneCountryCode;
    number: string;
  }>(() => {
    const result = PhoneSchema.safeParse(state);

    if (!result.success) {
      return {
        number: "",
        country: defaultCountry,
      };
    }

    return {
      number: result.data.number,
      country:
        result.data.country !== UNKNOWN_PHONE_COUNTRY_CODE
          ? result.data.country
          : defaultCountry,
    };
  });

  const fieldErrors = error as FieldErrors<Phone> | undefined;

  const fallbackPlaceholder = getPhonePlaceholderByCountryCode(phone.country);

  const handleOnChange: MuiTelInputProps["onChange"] = (number, info): void => {
    onChange(
      info.numberValue
        ? ({
            type: info.numberType || UNKNOWN_PHONE_NUMBER_TYPE,
            country: info.countryCode || UNKNOWN_PHONE_COUNTRY_CODE,
            number: info.numberValue,
          } satisfies Phone)
        : null,
    );

    setPhone((prev) => ({
      number,
      country: info.countryCode || prev.country,
    }));
  };

  return (
    <MuiTelInput
      {...params}
      forceCallingCode
      defaultCountry={defaultCountry}
      required={required}
      fullWidth={fullWidth}
      size={size}
      label={label}
      placeholder={placeholder || fallbackPlaceholder}
      value={phone.number}
      onChange={handleOnChange}
      error={Boolean(error)}
      helperText={
        fieldErrors?.root?.message ||
        fieldErrors?.type?.message ||
        fieldErrors?.country?.message ||
        fieldErrors?.number?.message ||
        helperText
      }
    />
  );
}

////////////////
// Re-exports //
////////////////

export { getPhonePlaceholderByCountryCode } from "./utils";
