"use client";

import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormGroup,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  Link as URLIcon,
  List as AllowedDomainsIcon,
} from "@mui/icons-material";
import type { FieldErrors } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import type { Form, URLField } from "@qikform/core";

import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledRichEditor,
} from "@/components";

import { useFormBuilder } from "../../../../context";

import { URLAllowedDomainsDialog } from "./components";
import { useURLFieldSettings } from "./hooks";

export interface URLFieldSettingsProps {
  field: URLField;
}

export function URLFieldSettings({
  field,
}: URLFieldSettingsProps): React.ReactElement {
  const {
    formState: { errors },
  } = useFormContext<Form>();

  const { elementIndexById } = useFormBuilder();

  const {
    isAllowedDomainsDialogOpen,
    openAllowedDomainsDialog,
    closeAllowedDomainsDialog,
  } = useURLFieldSettings();

  const index = elementIndexById[field.id];

  const fieldErrors = errors.elements?.[index] as
    | FieldErrors<URLField>
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
          <URLAllowedDomainsDialog
            fullWidth
            maxWidth="sm"
            field={field}
            open={isAllowedDomainsDialogOpen}
            onClose={closeAllowedDomainsDialog}
          />

          <ControlledCheckbox
            name={`elements.${index}.rules.required`}
            label="Required"
          />

          <Button
            fullWidth
            variant="outlined"
            color={fieldErrors?.rules?.allowedDomains ? "error" : "primary"}
            endIcon={<AllowedDomainsIcon />}
            onClick={openAllowedDomainsDialog}
          >
            Manage Allowed Domains
          </Button>
        </Stack>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Content</FormLabel>

        <Stack spacing={2} sx={{ paddingTop: 1.5 }}>
          <ControlledTextField
            name={`elements.${index}.defaultValue`}
            type="url"
            autoComplete="off"
            fullWidth
            size="small"
            label="Default Value"
            placeholder="https://example.com"
            helperText="The default value (optional)"
            startAdornment={
              <InputAdornment position="start">
                <URLIcon />
              </InputAdornment>
            }
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
