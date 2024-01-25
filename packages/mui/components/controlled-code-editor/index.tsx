"use client";

import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  useTheme,
} from "@mui/material";
import type { EditorProps } from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledCodeEditorProps
  extends UseControllerProps<Record<string, unknown>> {
  language: string;
  required?: boolean;
  label?: string | null;
  helperText?: string | null;
  options?: EditorProps["options"];
}

export function ControlledCodeEditor({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  language,
  required,
  label,
  helperText,
  options,
}: ControlledCodeEditorProps): React.ReactElement {
  const theme = useTheme();

  const {
    field: { value: state, onChange, ...params },
    fieldState: { error },
  } = useController({
    name,
    control,
    disabled,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const value = typeof state === "string" ? state : "";

  const handleOnChange = (code: string | undefined): void => {
    onChange(code || null);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      required={required}
      error={Boolean(error)}
    >
      <Box
        sx={[
          {
            padding: 0.5,
            borderRadius: 1,
            border: 1,
            borderColor:
              theme.palette.mode === "light" ? "grey.400" : "grey.700",
          },
          !params.disabled && {
            "&:hover": { borderColor: "action.active" },

            "&:focus-within": {
              outlineOffset: -2,
              outline: 1,
              outlineColor: "primary.main",
              borderColor: "primary.main",
            },

            ...(error && {
              borderColor: "error.main",

              "&:hover": { borderColor: "error.main" },

              "&:focus-within": {
                outlineOffset: -2,
                outline: 1,
                outlineColor: "error.main",
                borderColor: "error.main",
              },
            }),
          },
        ]}
      >
        {Boolean(label) && (
          <Box
            sx={{
              marginBottom: 1,
              padding: 1,
              borderBottom: 1,
              borderBottomColor: "divider",
            }}
          >
            <FormLabel>{label}</FormLabel>
          </Box>
        )}

        <Editor
          theme={theme.palette.mode === "dark" ? "vs-dark" : "light"}
          height={300}
          language={language}
          value={value}
          onChange={handleOnChange}
          options={options}
        />
      </Box>

      {(Boolean(error) || Boolean(helperText)) && (
        <FormHelperText>{error?.message || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
