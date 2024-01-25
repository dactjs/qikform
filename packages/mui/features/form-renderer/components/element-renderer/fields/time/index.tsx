"use client";

import { Box, FormControl } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";
import { isValid, isBefore, isAfter } from "date-fns";

import type { TimeField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../../lib";

import type { FormRendererValues } from "../../../../types";

export function TimeFieldRenderer({
  field,
}: {
  field: TimeField;
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
        minTime: (date) => {
          if (!field.rules.minTime) return true;

          if (date instanceof Date) {
            const minTime = new Date(date);

            minTime.setHours(
              field.rules.minTime.getHours(),
              field.rules.minTime.getMinutes(),
              field.rules.minTime.getSeconds()
            );

            if (isAfter(date, minTime)) return true;
          }

          return `Time must be after ${field.rules.minTime.toLocaleTimeString()}`;
        },
        maxTime: (date) => {
          if (!field.rules.maxTime) return true;

          if (date instanceof Date) {
            const maxTime = new Date(date);

            maxTime.setHours(
              field.rules.maxTime.getHours(),
              field.rules.maxTime.getMinutes(),
              field.rules.maxTime.getSeconds()
            );

            if (isBefore(date, maxTime)) return true;
          }

          return `Time must be before ${field.rules.maxTime.toLocaleTimeString()}`;
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
      <TimePicker
        {...params}
        label={field.label}
        minTime={field.rules.minTime as Date | undefined}
        maxTime={field.rules.maxTime as Date | undefined}
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
