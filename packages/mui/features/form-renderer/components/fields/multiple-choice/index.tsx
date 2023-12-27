"use client";

import {
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { ClearAll as ClearIcon } from "@mui/icons-material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { useController } from "react-hook-form";

import type { MultipleChoiceField } from "@qikform/core";

import type { FormRendererValues } from "../../../types";

export function MultipleChoiceFieldRenderer({
  field,
}: {
  field: MultipleChoiceField;
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

  const handleOnChange = (option: string) => () => {
    if (value === null || !Array.isArray(value)) {
      onChange([option]);
      return;
    }

    const selected = value as string[];

    if (selected.includes(option)) {
      const valid = selected.filter((item) => item !== option);

      onChange(valid.length > 0 ? valid : null);
    } else {
      onChange(selected.concat(option));
    }
  };

  const handleClear = (): void => {
    onChange(null);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      required={field.rules.required}
      error={Boolean(error)}
    >
      <Box
        component="fieldset"
        sx={{
          margin: 0,
          paddingX: 1.5,
          paddingBottom: 0.5,
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
            paddingX: 1.4,
            paddingBottom: 0.4,
            border: (theme) => `2px solid ${theme.palette.primary.main}`,
          },

          ...(error && {
            border: (theme) => `1px solid ${theme.palette.error.main}`,

            "&:hover": {
              border: (theme) => `1px solid ${theme.palette.error.main}`,
            },

            "&:focus-within": {
              paddingX: 1.4,
              paddingBottom: 0.4,
              border: (theme) => `2px solid ${theme.palette.error.main}`,
            },
          }),
        }}
      >
        <FormLabel
          component="legend"
          sx={{
            marginX: -0.5,
            paddingX: 0.5,
            fontSize: (theme) => theme.typography.caption.fontSize,
          }}
        >
          {field.label}
        </FormLabel>

        <FormGroup sx={{ paddingX: 0.5, paddingY: 0.5 }}>
          {field.options.map((option, index) => {
            const key = `${index}-${option}`;

            return (
              <FormControlLabel
                {...params}
                key={key}
                label={option}
                control={
                  <Checkbox
                    color={error ? "error" : "primary"}
                    checked={Array.isArray(value) && value.includes(option)}
                    onChange={handleOnChange(option)}
                    sx={{ ...(error && { "*": { color: "error.main" } }) }}
                  />
                }
                sx={{ color: error ? "error.main" : "text.primary" }}
              />
            );
          })}
        </FormGroup>

        {Boolean(value) && (
          <Button
            variant="outlined"
            size="small"
            endIcon={<ClearIcon />}
            onClick={handleClear}
            sx={{ width: "fit-content", marginBottom: 1 }}
          >
            Clear
          </Button>
        )}
      </Box>

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
