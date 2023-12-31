"use client";

import { useState } from "react";
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

import type { Form, MultipleChoiceField } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
  ControlledSelect,
} from "../../../../../../../components";

import { MultipleChoiceOptionsDialog } from "./components";

export interface MultipleChoiceFieldSettingsProps {
  field: MultipleChoiceField;
}

export function MultipleChoiceFieldSettings({
  field,
}: MultipleChoiceFieldSettingsProps): React.ReactElement {
  const {
    formState: { errors },
    watch,
  } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex((element) => element.id === field.id);

  const fieldOptions = watch(`elements.${index}.options`);

  const fieldErrors = errors.elements?.[index] as
    | FieldErrors<MultipleChoiceField>
    | undefined;

  const [isOptionsDialogOpen, setIsOptionsDialogOpen] =
    useState<boolean>(false);

  const handleOptionsDialogOpen = (): void => {
    setIsOptionsDialogOpen(true);
  };

  const handleOptionsDialogClose = (): void => {
    setIsOptionsDialogOpen(false);
  };

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

        <Stack spacing={1} sx={{ paddingTop: (theme) => theme.spacing(1.5) }}>
          <MultipleChoiceOptionsDialog
            fullWidth
            maxWidth="sm"
            field={field}
            open={isOptionsDialogOpen}
            onClose={handleOptionsDialogClose}
          />

          <ControlledSelect
            multiple
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
            onClick={handleOptionsDialogOpen}
          >
            Manage Options
          </Button>
        </Stack>
      </FormControl>
    </Stack>
  );
}
