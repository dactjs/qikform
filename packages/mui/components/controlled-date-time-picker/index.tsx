"use client";

import type { TextFieldProps } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledDateTimePickerProps
  extends UseControllerProps<Record<string, unknown>> {
  size?: TextFieldProps["size"];
  label?: string | null;
  helperText?: string | null;
}

export function ControlledDateTimePicker({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  size,
  label,
  helperText,
}: ControlledDateTimePickerProps): React.ReactElement {
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
    <DateTimePicker
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
