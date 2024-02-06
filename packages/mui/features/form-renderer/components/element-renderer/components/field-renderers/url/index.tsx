"use client";

import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Link as URLIcon } from "@mui/icons-material";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";

import type { URLField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "@/lib";

import type { FormRendererValues } from "../../../../../types";

export function URLFieldRenderer({
  field,
}: {
  field: URLField;
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
        isValid: (url) => {
          if (url === null) return true;

          if (typeof url === "string" && URL.canParse(url)) return true;

          return "Invalid URL";
        },
        isAllowed: (url) => {
          if (url === null) return true;

          if (typeof url === "string") {
            const { hostname } = new URL(url);

            const allowed = field.rules.allowedDomains.includes(hostname);

            return allowed || "Domain not allowed";
          }

          return "Domain not allowed";
        },
      },
    },
  });

  const value = typeof state === "string" ? state : "";

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const text = event.target.value;
    onChange(text || null);
  };

  const fallbackPlaceholder =
    Array.isArray(field.rules.allowedDomains) &&
    field.rules.allowedDomains.length > 0
      ? field.rules.allowedDomains
          .map((domain) => `https://${domain}`)
          .join(", ")
      : "https://example.com";

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
        type="url"
        id={field.id}
        label={field.label}
        placeholder={field.placeholder || fallbackPlaceholder}
        value={value}
        onChange={handleOnChange}
        startAdornment={
          <InputAdornment position="start">
            <URLIcon />
          </InputAdornment>
        }
        slotProps={{ input: { sx: { textOverflow: "ellipsis" } } }}
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
