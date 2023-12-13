"use client";

import type { TimePickerProps } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledTimePickerProps
  extends UseControllerProps<Record<string, unknown>> {
  helperText?: string | null;
  timePickerProps: Omit<
    TimePickerProps<Date>,
    | "name"
    | "disabled"
    | "defaultValue"
    | "value"
    | "onChange"
    | "error"
    | "helperText"
  >;
}

export function ControlledTimePicker({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  helperText,
  timePickerProps,
}: ControlledTimePickerProps): React.ReactElement {
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
    <TimePicker
      {...params}
      {...timePickerProps}
      value={value instanceof Date ? value : null}
      onChange={onChange}
      slotProps={{
        ...timePickerProps.slotProps,
        textField: {
          ...timePickerProps.slotProps?.textField,
          error: Boolean(error),
          helperText: error?.message || helperText,
        },
      }}
    />
  );
}
