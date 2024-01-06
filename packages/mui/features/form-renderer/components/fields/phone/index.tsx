"use client";

import { Box, FormControl } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { RichTextReadOnly } from "mui-tiptap";
import type { Validate } from "react-hook-form";
import { useController } from "react-hook-form";

import type { PhoneField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../lib";

import type { FormRendererValues } from "../../../types";

export function PhoneFieldRenderer({
  field,
}: {
  field: PhoneField;
}): React.ReactElement {
  const {
    field: { value, onChange, ...params },
    fieldState: { error },
  } = useController<FormRendererValues>({
    name: field.name || field.id,
    defaultValue: field.defaultValue,
    rules: {
      required: {
        value: field.rules.required,
        message: "Required",
      },
      validate: {
        matchIsValidTel: (phone: string) =>
          !phone || matchIsValidTel(phone) || "Invalid phone number",
      } as Record<string, Validate<unknown, Record<string, unknown>>>, // TODO: fix type,
    },
  });

  const handleOnChange = (phone: string): void => {
    onChange(phone || null);
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
        defaultCountry="US" // TODO: make this configurable
        required={field.rules.required}
        label={field.label}
        placeholder={field.placeholder || "555 555 5555"} // TODO: add a correct placeholder
        value={typeof value === "string" ? value : ""}
        onChange={handleOnChange}
        error={Boolean(error)}
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
