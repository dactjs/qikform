"use client";

import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledNumberFieldProps
  extends UseControllerProps<Record<string, unknown>> {
  helperText?: string | null;
  textFieldProps: Omit<
    TextFieldProps,
    | "type"
    | "name"
    | "disabled"
    | "defaultValue"
    | "value"
    | "onChange"
    | "error"
    | "helperText"
    | "inputProps"
  >;
}

export function ControlledNumberField({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  helperText,
  textFieldProps,
}: ControlledNumberFieldProps): React.ReactElement {
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

  const isValidNumber = (text: unknown): boolean => {
    return text !== "" && text !== undefined && text !== null;
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const text = event.target.value;

    onChange(isValidNumber(text) ? Number(text) : null);
  };

  return (
    <TextField
      {...params}
      {...textFieldProps}
      type="number"
      value={isValidNumber(value) ? Number(value) : ""}
      onChange={handleOnChange}
      error={Boolean(error)}
      helperText={error?.message || helperText}
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    />
  );
}
