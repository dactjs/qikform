"use client";

import { Box, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { useController } from "react-hook-form";

import type { CheckboxField } from "@qikform/core";

import type { FormRendererValues } from "../../../types";

export function CheckboxFieldRenderer({
  field,
}: {
  field: CheckboxField;
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
          <Checkbox
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
          paddingY: 0.75,
          color: error ? "error.main" : "text.primary",
          borderRadius: 1,
          border: (theme) =>
            error
              ? `1px solid ${theme.palette.error.main}`
              : `1px solid ${theme.palette.grey[700]}`,

          ...(!error && {
            "&:hover": {
              borderColor: (theme) => theme.palette.action.active,
            },
          }),

          "&:focus-within": {
            outline: (theme) =>
              error
                ? `1px solid ${theme.palette.error.main}`
                : `1px solid ${theme.palette.primary.main}`,
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
