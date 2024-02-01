"use client";

import type { SelectProps, SelectChangeEvent } from "@mui/material";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Typography,
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

  const showLabel = Boolean(label) && !placeholder;

  const normalizeValue = (value: unknown): string | string[] => {
    if (multiple) {
      if (!Array.isArray(value)) return [];

      const valid = value.filter((option) => options.includes(option));

      return valid as string[];
    }

    return typeof value === "string" && options.includes(value) ? value : "";
  };

  const value = normalizeValue(state);

  const handleOnChange = (
    event: SelectChangeEvent<string | string[]>,
  ): void => {
    const selected = event.target.value;

    if (typeof selected === "string") {
      onChange(selected || null);
      return;
    }

    const valid = selected.filter((option) => options.includes(option));
    onChange(valid.length > 0 ? valid : null);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size={size}
      required={required}
      error={Boolean(error)}
    >
      {Boolean(showLabel) && (
        <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      )}

      <Select
        {...params}
        {...(showLabel && {
          id: `${name}-select`,
          labelId: `${name}-select-label`,
          label,
        })}
        multiple={multiple}
        required={required}
        displayEmpty={Boolean(placeholder)}
        size={size}
        renderValue={(selected) => {
          if (typeof selected === "string") {
            return (
              <Typography
                component={selected ? "span" : "em"}
                color={selected ? "text.primary" : "text.secondary"}
              >
                {selected || placeholder}
              </Typography>
            );
          }

          return (
            <Typography
              component={selected.length > 0 ? "span" : "em"}
              color={selected.length > 0 ? "text.primary" : "text.secondary"}
            >
              {selected.length > 0 ? selected.join(", ") : placeholder}
            </Typography>
          );
        }}
        value={value}
        onChange={handleOnChange}
      >
        <MenuItem
          disabled={multiple}
          value={multiple ? [] : ""}
          sx={{ color: "text.secondary" }}
        >
          <em>--</em>
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
