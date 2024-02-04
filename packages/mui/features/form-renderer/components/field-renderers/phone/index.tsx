"use client";

import { useState } from "react";
import { Box, FormControl } from "@mui/material";
import type { MuiTelInputProps } from "mui-tel-input";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { RichTextReadOnly } from "mui-tiptap";
import type { FieldErrors } from "react-hook-form";
import { useController } from "react-hook-form";

import type { PhoneField, Phone, PhoneCountryCode } from "@qikform/core";
import {
  PhoneSchema,
  UNKNOWN_PHONE_NUMBER_TYPE,
  UNKNOWN_PHONE_COUNTRY_CODE,
} from "@qikform/core";

import { getPhonePlaceholderByCountryCode } from "@/components";
import { BASE_MUI_TIPTAP_EXTENSIONS } from "@/lib";

import type { FormRendererValues } from "../../../types";

export function FormRendererPhoneFieldRenderer({
  field,
}: {
  field: PhoneField;
}): React.ReactElement {
  const {
    field: { value: state, onChange, ...params },
    fieldState: { error },
  } = useController<FormRendererValues>({
    name: field.name || field.id,
    defaultValue: field.defaultValue,
    rules: {
      required: {
        value: Boolean(field.rules.required),
        message: "Required",
      },
      validate: {
        matchIsValidTel: (phone) => {
          if (phone === null) return true;

          const result = PhoneSchema.safeParse(phone);

          if (!result.success) return "Invalid phone number";

          if (result.data.country === UNKNOWN_PHONE_COUNTRY_CODE) return true;

          if (matchIsValidTel(result.data.number, result.data.country))
            return true;

          return "Invalid phone number";
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
        country: "US",
      };
    }

    return {
      number: result.data.number,
      country:
        result.data.country !== UNKNOWN_PHONE_COUNTRY_CODE
          ? result.data.country
          : "US",
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
    <FormControl
      fullWidth
      variant="outlined"
      required={field.rules.required}
      error={Boolean(error)}
    >
      <MuiTelInput
        {...params}
        forceCallingCode
        defaultCountry="US"
        required={field.rules.required}
        label={field.label}
        placeholder={field.placeholder || fallbackPlaceholder}
        value={phone.number}
        onChange={handleOnChange}
        error={Boolean(error)}
        helperText={
          fieldErrors?.root?.message ||
          fieldErrors?.type?.message ||
          fieldErrors?.country?.message ||
          fieldErrors?.number?.message ||
          field.helperText
        }
      />

      {(Boolean(error) || Boolean(field.helperText)) && (
        <Box
          sx={{
            marginLeft: 2,
            color: error ? "error.main" : "text.secondary",
          }}
        >
          <RichTextReadOnly
            extensions={BASE_MUI_TIPTAP_EXTENSIONS}
            content={error?.message || field.helperText}
          />
        </Box>
      )}
    </FormControl>
  );
}
