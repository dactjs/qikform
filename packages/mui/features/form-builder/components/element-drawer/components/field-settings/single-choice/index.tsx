"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
} from "@mui/material";
import { List as OptionsIcon } from "@mui/icons-material";
import type { FieldErrors } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import type { Form, SingleChoiceField } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
  ControlledSelect,
} from "@/components";

import { useFormBuilder } from "../../../../../context";

import { SingleChoiceOptionsDialog } from "./components";
import { useSingleChoiceFieldSettings } from "./hooks";

export interface SingleChoiceFieldSettingsProps {
  field: SingleChoiceField;
}

export function SingleChoiceFieldSettings({
  field,
}: SingleChoiceFieldSettingsProps): React.ReactElement {
  const {
    formState: { errors },
    watch,
  } = useFormContext<Form>();

  const { elementIndexById } = useFormBuilder();

  const { isOptionsDialogOpen, openOptionsDialog, closeOptionsDialog } =
    useSingleChoiceFieldSettings();

  const index = elementIndexById[field.id];

  const fieldOptions = watch(`elements.${index}.options`);

  const fieldErrors = errors.elements?.[index] as
    | FieldErrors<SingleChoiceField>
    | undefined;

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
            required
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
        </Stack>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Content</FormLabel>

        <Stack spacing={1} sx={{ paddingTop: 1.5 }}>
          <SingleChoiceOptionsDialog
            fullWidth
            maxWidth="sm"
            field={field}
            open={isOptionsDialogOpen}
            onClose={closeOptionsDialog}
          />

          <ControlledSelect
            name={`elements.${index}.defaultValue`}
            size="small"
            label="Default Value"
            helperText="The default value (optional)"
            options={fieldOptions}
          />

          <Button
            fullWidth
            variant="outlined"
            color={fieldErrors?.options ? "error" : "primary"}
            endIcon={<OptionsIcon />}
            onClick={openOptionsDialog}
          >
            Manage Options
          </Button>
        </Stack>
      </FormControl>
    </Stack>
  );
}
