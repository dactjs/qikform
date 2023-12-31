"use client";

import { useMemo } from "react";
import type { SelectProps, SelectChangeEvent } from "@mui/material";
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
  size?: SelectProps["size"];
  label?: string | null;
  placeholder?: string | null;
  helperText?: string | null;
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
  size,
  label,
  placeholder,
  helperText,
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

  const handleOnChange = (
    event: SelectChangeEvent<string | string[]>
  ): void => {
    if (typeof event.target.value === "string") {
      onChange(event.target.value || null);
      return;
    }

    const selected = event.target.value.filter((option) =>
      options.includes(option)
    );

    onChange(selected.length > 0 ? selected : null);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size={size}
      required={required}
      error={Boolean(error)}
    >
      {Boolean(label) && (
        <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      )}

      <Select
        {...params}
        id={`${name}-select`}
        labelId={`${name}-select-label`}
        multiple={multiple}
        required={required}
        displayEmpty={Boolean(placeholder)}
        size={size}
        label={label}
        value={selectedValue}
        onChange={handleOnChange}
      >
        <MenuItem
          disabled={multiple}
          value={multiple ? [] : ""}
          sx={{ color: "text.secondary" }}
        >
          <em>{placeholder || "None"}</em>
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
