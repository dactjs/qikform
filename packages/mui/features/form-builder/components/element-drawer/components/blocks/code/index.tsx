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

import type { Form, CodeBlock } from "@qikform/core";

import {
  ControlledTextField,
  ControlledRichEditor,
} from "../../../../../../../components";

export interface CodeBlockSettingsProps {
  block: CodeBlock;
}

export function CodeBlockSettings({
  block,
}: CodeBlockSettingsProps): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex((element) => element.id === block.id);

  return (
    <Stack spacing={2} divider={<Divider flexItem />}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Configuration</FormLabel>

        <FormGroup>
          <Controller
            name={`elements.${index}.configuration.hidden`}
            render={({ field, fieldState: { error } }) => (
              <FormControl error={Boolean(error)}>
                <FormControlLabel
                  label="Hidden"
                  control={
                    <Checkbox {...field} checked={Boolean(field.value)} />
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

          <ControlledRichEditor
            name={`elements.${index}.helperText`}
            label="Helper Text"
            helperText="The helper text (optional)"
          />
        </Stack>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Content</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: (theme) => theme.spacing(1.5) }}>
          <ControlledTextField
            name={`elements.${index}.content`}
            helperText="Only HTML and CSS are allowed"
            textFieldProps={{
              autoComplete: "off",
              required: true,
              multiline: true,
              fullWidth: true,
              label: "HTML & CSS",
            }}
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
