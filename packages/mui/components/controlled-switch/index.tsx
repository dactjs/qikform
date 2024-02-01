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

  const checked = Boolean(state);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.checked;
    onChange(typeof value === "boolean" ? value : null);
  };

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
            checked={checked}
            onChange={handleOnChange}
            sx={{ ...(error && { "*": { color: "error.main" } }) }}
          />
        }
        slotProps={{
          ...(error && {
            typography: { color: "error.main" },
          }),
        }}
        sx={{ minHeight: 42 }}
      />

      {(Boolean(error) || Boolean(helperText)) && (
        <FormHelperText sx={{ marginTop: -0.5 }}>
          {error?.message || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
