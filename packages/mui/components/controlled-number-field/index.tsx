"use client";

import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledNumberFieldProps
  extends UseControllerProps<Record<string, unknown>> {
  autoComplete?: TextFieldProps["autoComplete"];
  required?: boolean;
  fullWidth?: boolean;
  size?: TextFieldProps["size"];
  label?: string | null;
  placeholder?: string | null;
  helperText?: string | null;
}

export function ControlledNumberField({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  autoComplete,
  required,
  fullWidth,
  size,
  label,
  placeholder,
  helperText,
}: ControlledNumberFieldProps): React.ReactElement {
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

  const isValidNumber = (text: unknown): boolean =>
    text !== "" && text !== undefined && text !== null;

  const value = isValidNumber(state) ? Number(state) : "";

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const text = event.target.value;
    onChange(isValidNumber(text) ? Number(text) : null);
  };

  return (
    <TextField
      {...params}
      type="number"
      autoComplete={autoComplete}
      required={required}
      fullWidth={fullWidth}
      size={size}
      label={label}
      placeholder={placeholder as string | undefined}
      value={value}
      onChange={handleOnChange}
      error={Boolean(error)}
      helperText={error?.message || helperText}
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    />
  );
}
