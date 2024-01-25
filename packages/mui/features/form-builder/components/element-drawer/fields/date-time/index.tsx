"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";

import type { DateTimeField } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
  ControlledDateTimePicker,
} from "../../../../../../components";

import { useFormBuilder } from "../../../../context";

export interface DateTimeFieldSettingsProps {
  field: DateTimeField;
}

export function DateTimeFieldSettings({
  field,
}: DateTimeFieldSettingsProps): React.ReactElement {
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

          <ControlledDateTimePicker
            name={`elements.${index}.rules.minDateTime`}
            size="small"
            label="Min Date Time"
            helperText="The min date time (optional)"
          />

          <ControlledDateTimePicker
            name={`elements.${index}.rules.maxDateTime`}
            size="small"
            label="Max Date Time"
            helperText="The max date time (optional)"
          />
        </Stack>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Content</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: 1.5 }}>
          <ControlledDateTimePicker
            name={`elements.${index}.defaultValue`}
            size="small"
            label="Default Value"
            helperText="The default value (optional)"
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
