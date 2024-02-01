"use client";

import { Stack, IconButton } from "@mui/material";
import {
  BlurOn as RequiredIcon,
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { Controller } from "react-hook-form";

import type { FormElement } from "@qikform/core";
import { FormElementKind } from "@qikform/core";

import { useFormBuilder } from "../../../../../context";

export interface ElementItemActionsProps {
  show: boolean;
  element: FormElement;
}

export function ElementItemActions({
  show,
  element,
}: ElementItemActionsProps): React.ReactElement {
  const { elementIndexById, selectElement } = useFormBuilder();

  const index = elementIndexById[element.id];

  const handleSelectElement = (): void => {
    selectElement(element);
  };

  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center">
      {element.kind === FormElementKind.FIELD && (
        <Controller
          name={`elements.${index}.rules.required`}
          render={({ field: { value, onChange } }) => {
            const handleOnChange = (): void => {
              onChange(!value);
            };

            return (
              <IconButton
                size="small"
                color="inherit"
                aria-label={value ? "Make Optional" : "Make Required"}
                onClick={handleOnChange}
                sx={{ display: value || show ? "flex" : "none" }}
              >
                <RequiredIcon
                  fontSize="small"
                  color={value ? "error" : "disabled"}
                />
              </IconButton>
            );
          }}
        />
      )}

      <Controller
        name={`elements.${index}.configuration.hidden`}
        render={({ field: { value, onChange } }) => {
          const handleOnChange = (): void => {
            onChange(!value);
          };

          return (
            <IconButton
              size="small"
              color="inherit"
              aria-label={value ? "Show Element" : "Hide Element"}
              onClick={handleOnChange}
              sx={{ display: value || show ? "flex" : "none" }}
            >
              {value ? (
                <HideIcon fontSize="small" color="disabled" />
              ) : (
                <ShowIcon fontSize="small" />
              )}
            </IconButton>
          );
        }}
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
