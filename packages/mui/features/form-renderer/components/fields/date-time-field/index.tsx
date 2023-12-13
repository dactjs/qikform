import { Box, FormControl } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import type { Validate } from "react-hook-form";
import { useController } from "react-hook-form";
import { isValid, isBefore, isAfter } from "date-fns";

import type { DateTimeField } from "@qikform/core";

import type { FormRendererValues } from "../../../types";

export function DateTimeFieldRenderer({
  field,
}: {
  field: DateTimeField;
}): React.ReactElement {
  const {
    field: { value, onChange, ...params },
    fieldState: { error },
  } = useController<FormRendererValues>({
    name: field.name,
    defaultValue: field.defaultValue,
    rules: {
      required: {
        value: field.rules.required,
        message: "Required",
      },
      validate: {
        isValid: (date: Date | null) =>
          !date || isValid(date) || "Invalid date time",

        minDateTime: (date: Date) =>
          !field.rules.minDateTime ||
          isBefore(date, new Date(field.rules.minDateTime)) ||
          `Date time must be after ${field.rules.minDateTime.toLocaleDateString()}`,

        maxDateTime: (date: Date) =>
          !field.rules.maxDateTime ||
          isAfter(date, new Date(field.rules.maxDateTime)) ||
          `Date time must be before ${field.rules.maxDateTime.toLocaleDateString()}`,
      } as Record<string, Validate<unknown, Record<string, unknown>>>, // TODO: fix type
    },
  });

  const extensions = [
    StarterKit,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ];

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
        minDateTime={field.rules.minDateTime}
        maxDateTime={field.rules.maxDateTime}
        value={value}
        onChange={onChange}
        slotProps={{
          field: { clearable: true },
          textField: {
            required: field.rules.required,
            error: Boolean(error),
            ...(field.placeholder && { "aria-placeholder": field.placeholder }),
          },
        }}
      />

      {(Boolean(error) || Boolean(field.helperText)) && (
        <Box
          sx={{
            marginLeft: 2,
            color: ({ palette }) =>
              error ? palette.error.main : palette.text.secondary,
          }}
        >
          <RichTextReadOnly
            extensions={extensions}
            content={error?.message || field.helperText}
          />
        </Box>
      )}
    </FormControl>
  );
}
