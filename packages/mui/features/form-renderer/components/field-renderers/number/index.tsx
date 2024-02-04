"use client";

import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";

import type { NumberField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "@/lib";

import type { FormRendererValues } from "../../../types";

export function FormRendererNumberFieldRenderer({
  field,
}: {
  field: NumberField;
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
      ...(typeof field.rules.min === "number" && {
        min: {
          value: field.rules.min,
          message: `Minimum value is ${field.rules.min}`,
        },
      }),
      ...(typeof field.rules.max === "number" && {
        max: {
          value: field.rules.max,
          message: `Maximum value is ${field.rules.max}`,
        },
      }),
    },
  });

  const isValidNumber = (text: unknown): boolean =>
    text !== "" && text !== undefined && text !== null;

  const value = isValidNumber(state) ? Number(state) : "";

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const text = event.target.value;
    onChange(isValidNumber(text) ? Number(text) : null);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      required={field.rules.required}
      error={Boolean(error)}
    >
      {Boolean(field.label) && (
        <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
      )}

      <OutlinedInput
        {...params}
        id={field.id}
        type="number"
        label={field.label}
        placeholder={field.placeholder as string | undefined}
        value={value}
        onChange={handleOnChange}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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
