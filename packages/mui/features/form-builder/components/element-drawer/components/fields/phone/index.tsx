"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

import type { Form, PhoneField } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
} from "../../../../../../../components";

export interface PhoneFieldSettingsProps {
  field: PhoneField;
}

export function PhoneFieldSettings({
  field,
}: PhoneFieldSettingsProps): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex((element) => element.id === field.id);

  return (
    <Stack spacing={2} divider={<Divider flexItem />}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Configuration</FormLabel>

        <FormGroup>
          <ControlledCheckbox
            name={`elements.${index}.configuration.hidden`}
            label="Hidden"
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Information</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: (theme) => theme.spacing(1.5) }}>
          <ControlledTextField
            name={`elements.${index}.name`}
            autoComplete="off"
            required
            fullWidth
            size="small"
            label="Name"
            helperText="Unique name for this block. Use only letters, numbers, and underscores"
          />

          <ControlledTextField
            name={`elements.${index}.label`}
            autoComplete="off"
            fullWidth
            size="small"
            label="Label"
            helperText="The label (optional)"
          />

          <ControlledTextField
            name={`elements.${index}.placeholder`}
            autoComplete="off"
            fullWidth
            size="small"
            label="Placeholder"
            helperText="The placeholder (optional)"
          />

          <ControlledRichEditor
            name={`elements.${index}.helperText`}
            label="Helper Text"
            helperText="The helper text (optional)"
          />
        </Stack>
      </FormControl>

      {/* TODO: add country filter */}
      {/* TODO: add continent filter */}
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Rules</FormLabel>

        <Stack spacing={2}>
          <ControlledCheckbox
            name={`elements.${index}.rules.required`}
            label="Required"
          />
        </Stack>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Content</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: (theme) => theme.spacing(1.5) }}>
          {/* TODO: refactor default value */}
          <Controller
            name={`elements.${index}.defaultValue`}
            rules={{ validate: matchIsValidTel }}
            render={({
              field: { value, onChange, ...params },
              fieldState: { error },
            }) => {
              const handleOnChange = (phone: string): void => {
                onChange(phone || null);
              };

              return (
                <MuiTelInput
                  {...params}
                  size="small"
                  label="Default Value"
                  placeholder={field.placeholder || "555 555 5555"}
                  value={typeof value === "string" ? value : ""}
                  onChange={handleOnChange}
                  error={Boolean(error)}
                  helperText={error?.message || "The default value (optional)"}
                />
              );
            }}
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
