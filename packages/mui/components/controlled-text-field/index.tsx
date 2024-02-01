"use client";

import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledTextFieldProps
  extends UseControllerProps<Record<string, unknown>> {
  type?: TextFieldProps["type"];
  autoComplete?: TextFieldProps["autoComplete"];
  required?: boolean;
  multiline?: boolean;
  fullWidth?: boolean;
  size?: TextFieldProps["size"];
  label?: string | null;
  placeholder?: string | null;
  helperText?: string | null;
  startAdornment?: React.ReactNode;
}

export function ControlledTextField({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  type,
  autoComplete,
  required,
  multiline,
  fullWidth,
  size,
  label,
  placeholder,
  helperText,
  startAdornment,
}: ControlledTextFieldProps): React.ReactElement {
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

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const text = event.target.value;
    onChange(text || null);
  };

  return (
    <TextField
      {...params}
      type={type}
      autoComplete={autoComplete}
      required={required}
      multiline={multiline}
      fullWidth={fullWidth}
      size={size}
      label={label}
      placeholder={placeholder as string | undefined}
      value={value}
      onChange={handleOnChange}
      error={Boolean(error)}
      helperText={error?.message || helperText}
      InputProps={{ startAdornment }}
    />
  );
}
