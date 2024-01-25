"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";

import type { PlainTextField } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
  ControlledNumberField,
} from "../../../../../../components";

import { useFormBuilder } from "../../../../context";

export interface PlainTextFieldSettingsProps {
  field: PlainTextField;
}

export function PlainTextFieldSettings({
  field,
}: PlainTextFieldSettingsProps): React.ReactElement {
  const { elementIndexById } = useFormBuilder();

  const index = elementIndexById[field.id];

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

        <Stack spacing={2} sx={{ paddingTop: 1.5 }}>
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

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Rules</FormLabel>

        <Stack spacing={2}>
          <ControlledCheckbox
            name={`elements.${index}.rules.required`}
            label="Required"
          />

          <ControlledNumberField
            name={`elements.${index}.rules.minLength`}
            autoComplete="off"
            fullWidth
            size="small"
            label="Min Characters"
            helperText="The min characters (optional)"
          />

          <ControlledNumberField
            name={`elements.${index}.rules.maxLength`}
            autoComplete="off"
            fullWidth
            size="small"
            label="Max Characters"
            helperText="The max characters (optional)"
          />
        </Stack>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Content</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: 1.5 }}>
          <ControlledTextField
            name={`elements.${index}.defaultValue`}
            autoComplete="off"
            fullWidth
            size="small"
            label="Default Value"
            helperText="The default value (optional)"
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
