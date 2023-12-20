"use client";

import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import { ClearAll as ClearIcon } from "@mui/icons-material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { useController } from "react-hook-form";

import type { SingleChoiceField } from "@qikform/core";

import type { FormRendererValues } from "../../../types";

export function SingleChoiceFieldRenderer({
  field,
}: {
  field: SingleChoiceField;
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
            error
              ? `1px solid ${theme.palette.error.main}`
              : `1px solid ${theme.palette.grey[700]}`,

          ...(!error && {
            "&:hover": {
              borderColor: (theme) => theme.palette.action.active,
            },
          }),

          "&:focus-within": {
            border: (theme) =>
              error
                ? `1px solid ${theme.palette.error.main}`
                : `1px solid ${theme.palette.primary.main}`,
          },
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

        <RadioGroup
          value={value}
          onChange={onChange}
          sx={{ paddingX: 0.5, paddingY: 0.5 }}
        >
          {field.options.map((option, index) => {
            const key = `${index}-${option}`;

            return (
              <FormControlLabel
                {...params}
                key={key}
                label={option}
                value={option}
                control={
                  <Radio
                    color={error ? "error" : "primary"}
                    sx={{ ...(error && { "*": { color: "error.main" } }) }}
                  />
                }
                sx={{ color: error ? "error.main" : "text.primary" }}
              />
            );
          })}
        </RadioGroup>

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
