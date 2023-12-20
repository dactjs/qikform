"use client";

import { useMemo } from "react";
import type { SelectProps } from "@mui/material";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledSelectProps
  extends UseControllerProps<Record<string, unknown>> {
  options: string[];
  multiple?: boolean;
  required?: boolean;
  label?: string | null;
  placeholder?: string | null;
  helperText?: string | null;
  selectProps?: Omit<
    SelectProps,
    | "id"
    | "labelId"
    | "name"
    | "multiple"
    | "required"
    | "disabled"
    | "displayEmpty"
    | "label"
    | "defaultValue"
    | "value"
    | "onChange"
  >;
}

export function ControlledSelect({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  options,
  multiple,
  required,
  label,
  placeholder,
  helperText,
  selectProps,
}: ControlledSelectProps): React.ReactElement {
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

  const selectedValue = useMemo(() => {
    if (multiple) {
      if (!Array.isArray(value)) return [];

      return (value as string[]).filter((option) => options.includes(option));
    }

    return typeof value === "string" && options.includes(value) ? value : "";
  }, [options, multiple, value]);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size={selectProps?.size}
      required={required}
      error={Boolean(error)}
    >
      {Boolean(label) && (
        <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      )}

      <Select
        {...params}
        {...selectProps}
        id={`${name}-select`}
        labelId={`${name}-select-label`}
        multiple={multiple}
        required={required}
        displayEmpty={Boolean(placeholder)}
        label={label}
        value={selectedValue}
        onChange={onChange}
      >
        <MenuItem value={multiple ? [] : ""}>
          <em>{placeholder || "--"}</em>
        </MenuItem>

        {options.map((option, index) => {
          const key = `${index}-${option}`;

          return (
            <MenuItem key={key} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>

      {(Boolean(error) || Boolean(helperText)) && (
        <FormHelperText>{error?.message || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
