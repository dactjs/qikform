"use client";

import type { DateTimePickerProps } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledDateTimePickerProps
  extends UseControllerProps<Record<string, unknown>> {
  helperText?: string | null;
  dateTimePickerProps: Omit<
    DateTimePickerProps<Date>,
    | "name"
    | "disabled"
    | "defaultValue"
    | "value"
    | "onChange"
    | "error"
    | "helperText"
  >;
}

export function ControlledDateTimePicker({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  helperText,
  dateTimePickerProps,
}: ControlledDateTimePickerProps): React.ReactElement {
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
    <DateTimePicker
      {...params}
      {...dateTimePickerProps}
      value={value instanceof Date ? value : null}
      onChange={onChange}
      slotProps={{
        ...dateTimePickerProps.slotProps,
        textField: {
          ...dateTimePickerProps.slotProps?.textField,
          error: Boolean(error),
          helperText: error?.message || helperText,
        },
      }}
    />
  );
}
