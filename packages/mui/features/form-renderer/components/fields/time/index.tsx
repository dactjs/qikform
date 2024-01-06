"use client";

import { Box, FormControl } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { RichTextReadOnly } from "mui-tiptap";
import type { Validate } from "react-hook-form";
import { useController } from "react-hook-form";
import { isValid, isBefore, isAfter } from "date-fns";

import type { TimeField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../lib";

import type { FormRendererValues } from "../../../types";

export function TimeFieldRenderer({
  field,
}: {
  field: TimeField;
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
          !date || isValid(date) || "Invalid time",

        minTime: (date: Date) =>
          !field.rules.minTime ||
          isBefore(date, new Date(field.rules.minTime)) ||
          `Time must be after ${field.rules.minTime.toLocaleTimeString()}`,

        maxTime: (date: Date) =>
          !field.rules.maxTime ||
          isAfter(date, new Date(field.rules.maxTime)) ||
          `Time must be before ${field.rules.maxTime.toLocaleTimeString()}`,
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
      <TimePicker
        {...params}
        label={field.label}
        minTime={field.rules.minTime}
        maxTime={field.rules.maxTime}
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
