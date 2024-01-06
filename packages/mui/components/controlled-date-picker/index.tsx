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

  return (
    <DatePicker
      {...params}
      value={value instanceof Date ? value : null}
      onChange={onChange}
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
