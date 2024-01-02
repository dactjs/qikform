"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form, PageBreakBlock } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
} from "../../../../../../../components";

export interface PageBreakBlockSettingsProps {
  block: PageBreakBlock;
}

export function PageBreakBlockSettings({
  block,
}: PageBreakBlockSettingsProps): React.ReactElement {
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
        </Stack>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Content</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: (theme) => theme.spacing(1.5) }}>
          <ControlledTextField
            name={`elements.${index}.nextPageButtonText`}
            helperText="The text for the `next page button`. Shown on the current page."
            textFieldProps={{
              autoComplete: "off",
              required: true,
              fullWidth: true,
              size: "small",
              label: "Next Page Button Text",
            }}
          />

          <ControlledTextField
            name={`elements.${index}.previousPageButtonText`}
            helperText="The text for the `previous page button`. Shown on the next page."
            textFieldProps={{
              autoComplete: "off",
              required: true,
              fullWidth: true,
              size: "small",
              label: "Previous Page Button Text",
            }}
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
