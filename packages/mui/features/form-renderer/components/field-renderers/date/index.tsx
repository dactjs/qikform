"use client";

import { Box, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";
import { isValid, isBefore, isAfter } from "date-fns";

import type { DateField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "@/lib";

import type { FormRendererValues } from "../../../types";

export function FormRendererDateFieldRenderer({
  field,
}: {
  field: DateField;
}): React.ReactElement {
  const {
    field: { value: state, onChange, ...params },
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
        isValid: (date) => {
          if (date === null) return true;

          if (isValid(date)) return true;

          return "Invalid date";
        },
        minDate: (date) => {
          if (!field.rules.minDate) return true;

          if (date instanceof Date) {
            const minDate = new Date(date);

            minDate.setHours(0, 0, 0, 0);

            if (isAfter(date, minDate)) return true;
          }

          return `Date must be after ${field.rules.minDate.toLocaleDateString()}`;
        },
        maxDate: (date) => {
          if (!field.rules.maxDate) return true;

          if (date instanceof Date) {
            const maxDate = new Date(date);

            maxDate.setHours(0, 0, 0, 0);

            if (isBefore(date, maxDate)) return true;
          }

          return `Date must be before ${field.rules.maxDate.toLocaleDateString()}`;
        },
      },
    },
  });

  const value = state instanceof Date ? state : null;

  const handleOnChange = (date: Date | null): void => {
    onChange(date);
  };

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
        minDate={field.rules.minDate as Date | undefined}
        maxDate={field.rules.maxDate as Date | undefined}
        value={value}
        onChange={handleOnChange}
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
