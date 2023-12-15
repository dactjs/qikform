"use client";

import { Stack, IconButton } from "@mui/material";
import {
  BlurOn as RequiredIcon,
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { Controller, useFormContext } from "react-hook-form";

import type { Form, FormElement } from "@qikform/core";
import { FormElementCategory } from "@qikform/core";

import { useFormBuilder } from "../../../../../../context";

export interface FormElementItemActionsProps {
  show: boolean;
  element: FormElement;
}

export function FormElementItemActions({
  show,
  element,
}: FormElementItemActionsProps): React.ReactElement {
  const { selectElement } = useFormBuilder();

  const { watch } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex(({ id }) => id === element.id);

  const handleSelectElement = (): void => {
    selectElement(element);
  };

  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center">
      {element.category === FormElementCategory.FIELD && (
        <Controller
          name={`elements.${index}.rules.required`}
          render={({ field: { value, onChange } }) => (
            <IconButton
              size="small"
              color="inherit"
              aria-label={value ? "Make Optional" : "Make Required"}
              onClick={() => {
                onChange(!value);
              }}
              sx={{ display: value || show ? "flex" : "none" }}
            >
              <RequiredIcon
                fontSize="small"
                color={value ? "error" : "disabled"}
              />
            </IconButton>
          )}
        />
      )}

      <Controller
        name={`elements.${index}.configuration.hidden`}
        render={({ field: { value, onChange } }) => (
          <IconButton
            size="small"
            color="inherit"
            aria-label={value ? "Show Element" : "Hide Element"}
            onClick={() => {
              onChange(!value);
            }}
            sx={{ display: value || show ? "flex" : "none" }}
          >
            {value ? (
              <HideIcon fontSize="small" color="disabled" />
            ) : (
              <ShowIcon fontSize="small" />
            )}
          </IconButton>
        )}
      />

      <IconButton
        size="small"
        color="inherit"
        aria-label="Open Element Configuration"
        onClick={handleSelectElement}
      >
        <SettingsIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
