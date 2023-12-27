"use client";

import { Box, FormControl, FormControlLabel, Switch } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { useController } from "react-hook-form";

import type { SwitchField } from "@qikform/core";

import type { FormRendererValues } from "../../../types";

export function SwitchFieldRenderer({
  field,
}: {
  field: SwitchField;
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
      <FormControlLabel
        {...params}
        required={field.rules.required}
        label={field.label}
        control={
          <Switch
            color={error ? "error" : "primary"}
            checked={Boolean(value)}
            onChange={onChange}
            sx={{ ...(error && { "*": { color: "error.main" } }) }}
          />
        }
        sx={{
          minHeight: 42,
          margin: 0,
          paddingX: 0.5,
          paddingY: 1,
          color: error ? "error.main" : "text.primary",
          borderRadius: 1,
          border: (theme) =>
            theme.palette.mode === "light"
              ? `1px solid ${theme.palette.grey[400]}`
              : `1px solid ${theme.palette.grey[700]}`,

          "&:hover": {
            border: (theme) => `1px solid ${theme.palette.action.active}`,
          },

          "&:focus-within": {
            outlineOffset: -2,
            outline: (theme) => `1px solid ${theme.palette.primary.main}`,
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
          },

          ...(error && {
            border: (theme) => `1px solid ${theme.palette.error.main}`,

            "&:hover": {
              border: (theme) => `1px solid ${theme.palette.error.main}`,
            },

            "&:focus-within": {
              outline: (theme) => `1px solid ${theme.palette.error.main}`,
            },
          }),
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
