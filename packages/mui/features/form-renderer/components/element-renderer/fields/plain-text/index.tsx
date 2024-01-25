"use client";

import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";

import type { PlainTextField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../../lib";

import type { FormRendererValues } from "../../../../types";

export function PlainTextFieldRenderer({
  field,
}: {
  field: PlainTextField;
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
      ...(typeof field.rules.minLength === "number" && {
        minLength: {
          value: field.rules.minLength,
          message: `Minimum characters is ${field.rules.minLength}`,
        },
      }),
      ...(typeof field.rules.maxLength === "number" && {
        maxLength: {
          value: field.rules.maxLength,
          message: `Maximum characters is ${field.rules.maxLength}`,
        },
      }),
    },
  });

  const value = typeof state === "string" ? state : "";

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const text = event.target.value;
    onChange(text || null);
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
        label={field.label}
        placeholder={field.placeholder as string | undefined}
        value={value}
        onChange={handleOnChange}
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
