"use client";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledSwitchProps
  extends UseControllerProps<Record<string, unknown>> {
  required?: boolean;
  label?: string | null;
  helperText?: string | null;
}

export function ControlledSwitch({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  required,
  label,
  helperText,
}: ControlledSwitchProps): React.ReactElement {
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
    <FormControl
      fullWidth
      variant="outlined"
      required={required}
      error={Boolean(error)}
    >
      <FormControlLabel
        {...params}
        required={required}
        label={label}
        control={
          <Switch
            color={error ? "error" : "primary"}
            checked={Boolean(value)}
            onChange={onChange}
            sx={{ ...(error && { "*": { color: "error.main" } }) }}
          />
        }
        sx={{ color: error ? "error.main" : "text.primary" }}
      />

      {(Boolean(error) || Boolean(helperText)) && (
        <FormHelperText sx={{ marginTop: -0.25 }}>
          {error?.message || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
