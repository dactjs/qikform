"use client";

import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledTextFieldProps
  extends UseControllerProps<Record<string, unknown>> {
  helperText?: string | null;
  textFieldProps: Omit<
    TextFieldProps,
    | "name"
    | "disabled"
    | "defaultValue"
    | "value"
    | "onChange"
    | "error"
    | "helperText"
  >;
}

export function ControlledTextField({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  helperText,
  textFieldProps,
}: ControlledTextFieldProps): React.ReactElement {
  const {
    field: { value, onChange, ...params },
    fieldState: { error },
  } = useController({
    name,
    control,
    disabled,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const text = event.target.value;

    onChange(text || null);
  };

  return (
    <TextField
      {...params}
      {...textFieldProps}
      value={typeof value === "string" ? value : ""}
      onChange={handleOnChange}
      error={Boolean(error)}
      helperText={error?.message || helperText}
    />
  );
}
