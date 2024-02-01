"use client";

import { Box, FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";
import { isValid, isBefore, isAfter } from "date-fns";

import type { DateTimeField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../../lib";

import type { FormRendererValues } from "../../../../types";

export function FormRendererDateTimeFieldRenderer({
  field,
}: {
  field: DateTimeField;
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
        minDateTime: (date) => {
          if (!field.rules.minDateTime) return true;

          if (date instanceof Date && isAfter(date, field.rules.minDateTime))
            return true;

          return `Date time must be after ${field.rules.minDateTime.toLocaleString()}`;
        },
        maxDateTime: (date) => {
          if (!field.rules.maxDateTime) return true;

          if (date instanceof Date && isBefore(date, field.rules.maxDateTime))
            return true;

          return `Date time must be before ${field.rules.maxDateTime.toLocaleString()}`;
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
      <DateTimePicker
        {...params}
        label={field.label}
        minDateTime={field.rules.minDateTime as Date | undefined}
        maxDateTime={field.rules.maxDateTime as Date | undefined}
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
