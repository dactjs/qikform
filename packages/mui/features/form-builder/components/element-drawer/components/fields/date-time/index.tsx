"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { Form, DateTimeField } from "@qikform/core";

import {
  ControlledTextField,
  ControlledRichEditor,
  ControlledDateTimePicker,
} from "../../../../../../../components";

export interface DateTimeFieldSettingsProps {
  field: DateTimeField;
}

export function DateTimeFieldSettings({
  field,
}: DateTimeFieldSettingsProps): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex((element) => element.id === field.id);

  return (
    <Stack spacing={2} divider={<Divider flexItem />}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Configuration</FormLabel>

        <FormGroup>
          <Controller
            name={`elements.${index}.configuration.hidden`}
            render={({ field: params, fieldState: { error } }) => (
              <FormControl error={Boolean(error)}>
                <FormControlLabel
                  label="Hidden"
                  control={
                    <Checkbox {...params} checked={Boolean(params.value)} />
                  }
                />

                {Boolean(error) && (
                  <FormHelperText>{error?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Rules</FormLabel>

        <Stack spacing={2}>
          <Controller
            name={`elements.${index}.rules.required`}
            render={({ field: params, fieldState: { error } }) => (
              <FormControl error={Boolean(error)}>
                <FormControlLabel
                  label="Required"
                  control={
                    <Checkbox {...params} checked={Boolean(params.value)} />
                  }
                />

                {Boolean(error) && (
                  <FormHelperText>{error?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <ControlledDateTimePicker
            name={`elements.${index}.rules.minDateTime`}
            helperText="The min date time (optional)"
            dateTimePickerProps={{
              label: "Min Date Time",
              slotProps: { textField: { size: "small" } },
            }}
          />

          <ControlledDateTimePicker
            name={`elements.${index}.rules.maxDateTime`}
            helperText="The max date time (optional)"
            dateTimePickerProps={{
              label: "Max Date Time",
              slotProps: { textField: { size: "small" } },
            }}
          />
        </Stack>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Information</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: (theme) => theme.spacing(1.5) }}>
          <ControlledTextField
            name={`elements.${index}.name`}
            helperText="Unique name for this block. Use only letters, numbers, and underscores"
            textFieldProps={{
              autoComplete: "off",
              required: true,
              fullWidth: true,
              size: "small",
              label: "Name",
            }}
          />

          <ControlledTextField
            name={`elements.${index}.label`}
            helperText="The label (optional)"
            textFieldProps={{
              autoComplete: "off",
              fullWidth: true,
              size: "small",
              label: "Label",
            }}
          />

          <ControlledTextField
            name={`elements.${index}.defaultValue`}
            helperText="The default value (optional)"
            textFieldProps={{
              autoComplete: "off",
              fullWidth: true,
              size: "small",
              label: "Default Value",
            }}
          />

          <ControlledTextField
            name={`elements.${index}.placeholder`}
            helperText="The placeholder (optional)"
            textFieldProps={{
              autoComplete: "off",
              fullWidth: true,
              size: "small",
              label: "Placeholder",
            }}
          />

          <ControlledRichEditor
            name={`elements.${index}.helperText`}
            label="Helper Text"
            helperText="The helper text (optional)"
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
