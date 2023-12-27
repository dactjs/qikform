"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
  InputAdornment,
} from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";

import type { Form, EmailField } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
} from "../../../../../../../components";

export interface EmailFieldSettingsProps {
  field: EmailField;
}

export function EmailFieldSettings({
  field,
}: EmailFieldSettingsProps): React.ReactElement {
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
            // the key is used to force the component to re-render when the element is duplicated
            key={field.name}
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

      {/* TODO: add domain filter */}
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
          <ControlledTextField
            name={`elements.${index}.defaultValue`}
            helperText="The default value (optional)"
            textFieldProps={{
              type: "email",
              autoComplete: "off",
              fullWidth: true,
              size: "small",
              label: "Default Value",
              placeholder: "example@me.com",
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
