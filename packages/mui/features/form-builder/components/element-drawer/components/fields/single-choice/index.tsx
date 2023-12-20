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

import type { Form, SingleChoiceField } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
  ControlledSelect,
} from "../../../../../../../components";

import { SingleChoiceOptionsDialog } from "./components";

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

  const elements = watch("elements");

  const index = elements.findIndex((element) => element.id === field.id);

  const fieldOptions = watch(`elements.${index}.options`);

  const fieldErrors = errors.elements?.[index] as
    | FieldErrors<SingleChoiceField>
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
            helperText="The label"
            textFieldProps={{
              autoComplete: "off",
              required: true,
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
          <SingleChoiceOptionsDialog
            fullWidth
            maxWidth="sm"
            field={field}
            open={isOptionsDialogOpen}
            onClose={handleOptionsDialogClose}
          />

          <ControlledSelect
            name={`elements.${index}.defaultValue`}
            label="Default Value"
            helperText="The default value (optional)"
            options={fieldOptions}
            selectProps={{ size: "small" }}
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
