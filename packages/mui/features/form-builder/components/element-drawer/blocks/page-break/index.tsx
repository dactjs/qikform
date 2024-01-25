"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";

import type { PageBreakBlock } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
} from "../../../../../../components";

import { useFormBuilder } from "../../../../context";

export interface PageBreakBlockSettingsProps {
  block: PageBreakBlock;
}

export function PageBreakBlockSettings({
  block,
}: PageBreakBlockSettingsProps): React.ReactElement {
  const { elementIndexById } = useFormBuilder();

  const index = elementIndexById[block.id];

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
        </Stack>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Content</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: 1.5 }}>
          <ControlledTextField
            name={`elements.${index}.nextPageButtonText`}
            autoComplete="off"
            required
            fullWidth
            size="small"
            label="Next Page Button Text"
            helperText="The text for the `next page button`. Shown on the current page."
          />

          <ControlledTextField
            name={`elements.${index}.previousPageButtonText`}
            autoComplete="off"
            required
            fullWidth
            size="small"
            label="Previous Page Button Text"
            helperText="The text for the `previous page button`. Shown on the next page."
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
