"use client";

import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";

import type { EmailField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../lib";

import type { FormRendererValues } from "../../../types";

export function EmailFieldRenderer({
  field,
}: {
  field: EmailField;
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
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Invalid email",
      },
    },
  });

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
        type="email"
        id={field.id}
        label={field.label}
        placeholder={field.placeholder || "example@me.com"}
        value={typeof value === "string" ? value : ""}
        onChange={handleOnChange}
        startAdornment={
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
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
