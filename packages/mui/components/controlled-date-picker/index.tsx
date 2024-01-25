"use client";

import type { TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledDatePickerProps
  extends UseControllerProps<Record<string, unknown>> {
  size?: TextFieldProps["size"];
  label?: string | null;
  helperText?: string | null;
}

export function ControlledDatePicker({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  size,
  label,
  helperText,
}: ControlledDatePickerProps): React.ReactElement {
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

  const value = state instanceof Date ? state : null;

  const handleOnChange = (date: Date | null): void => {
    onChange(date);
  };

  return (
    <DatePicker
      {...params}
      value={value}
      onChange={handleOnChange}
      slotProps={{
        field: { clearable: true },
        textField: {
          size,
          label,
          error: Boolean(error),
          helperText: error?.message || helperText,
        },
      }}
    />
  );
}
