"use client";

import type { DatePickerProps } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledDatePickerProps
  extends UseControllerProps<Record<string, unknown>> {
  helperText?: string | null;
  datePickerProps: Omit<
    DatePickerProps<Date>,
    | "name"
    | "disabled"
    | "defaultValue"
    | "value"
    | "onChange"
    | "error"
    | "helperText"
  >;
}

export function ControlledDatePicker({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  helperText,
  datePickerProps,
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
      {...datePickerProps}
      value={value instanceof Date ? value : null}
      onChange={onChange}
      slotProps={{
        ...datePickerProps.slotProps,
        textField: {
          ...datePickerProps.slotProps?.textField,
          error: Boolean(error),
          helperText: error?.message || helperText,
        },
      }}
    />
  );
}
