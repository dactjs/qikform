"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form, DividerBlock } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
} from "../../../../../../../components";

export interface DividerBlockSettingsProps {
  block: DividerBlock;
}

export function DividerBlockSettings({
  block,
}: DividerBlockSettingsProps): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex((element) => element.id === block.id);

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
