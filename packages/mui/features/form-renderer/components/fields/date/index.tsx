"use client";

import { Box, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { RichTextReadOnly } from "mui-tiptap";
import type { Validate } from "react-hook-form";
import { useController } from "react-hook-form";
import { isValid, isBefore, isAfter } from "date-fns";

import type { DateField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../lib";

import type { FormRendererValues } from "../../../types";

export function DateFieldRenderer({
  field,
}: {
  field: DateField;
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
        isValid: (date: Date | null) =>
          !date || isValid(date) || "Invalid date",

        minDate: (date: Date) =>
          !field.rules.minDate ||
          isBefore(date, new Date(field.rules.minDate)) ||
          `Date must be after ${field.rules.minDate.toLocaleDateString()}`,

        maxDate: (date: Date) =>
          !field.rules.maxDate ||
          isAfter(date, new Date(field.rules.maxDate)) ||
          `Date must be before ${field.rules.maxDate.toLocaleDateString()}`,
      } as Record<string, Validate<unknown, Record<string, unknown>>>, // TODO: fix type
    },
  });

  return (
    <FormControl
      fullWidth
      variant="outlined"
      required={field.rules.required}
      error={Boolean(error)}
    >
      <DatePicker
        {...params}
        label={field.label}
        minDate={field.rules.minDate}
        maxDate={field.rules.maxDate}
        value={value}
        onChange={onChange}
        slotProps={{
          field: { clearable: true },
          textField: {
            required: field.rules.required,
            error: Boolean(error),
          },
        }}
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
