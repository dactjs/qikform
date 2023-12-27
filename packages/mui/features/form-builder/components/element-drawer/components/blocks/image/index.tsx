"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form, ImageBlock } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
} from "../../../../../../../components";

export interface ImageBlockSettingsProps {
  block: ImageBlock;
}

export function ImageBlockSettings({
  block,
}: ImageBlockSettingsProps): React.ReactElement {
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
            // the key is used to force the component to re-render when the element is duplicated
            key={block.name}
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

          <ControlledRichEditor
            name={`elements.${index}.helperText`}
            label="Helper Text"
            helperText="The helper text (optional)"
          />
        </Stack>
      </FormControl>

      {/* TODO: add upload image feature */}
      {/* TODO: add layout options */}
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Content</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: (theme) => theme.spacing(1.5) }}>
          <ControlledTextField
            name={`elements.${index}.url`}
            textFieldProps={{
              type: "url",
              autoComplete: "off",
              required: true,
              fullWidth: true,
              size: "small",
              label: "URL",
            }}
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
