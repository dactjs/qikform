"use client";

import { Box, FormControl, FormControlLabel, Switch } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";

import type { SwitchField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../../lib";

import type { FormRendererValues } from "../../../../types";

export function SwitchFieldRenderer({
  field,
}: {
  field: SwitchField;
}): React.ReactElement {
  const {
    field: { value: state, onChange, ...params },
    fieldState: { error },
  } = useController<FormRendererValues>({
    name: field.name || field.id,
    defaultValue: field.defaultValue,
    rules: {
      required: {
        value: field.rules.required,
        message: "Required",
      },
    },
  });

  const checked = Boolean(state);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.checked;
    onChange(typeof value === "boolean" ? value : null);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      required={field.rules.required}
      error={Boolean(error)}
    >
      <FormControlLabel
        {...params}
        required={field.rules.required}
        label={field.label}
        control={
          <Switch
            color={error ? "error" : "primary"}
            checked={checked}
            onChange={handleOnChange}
            sx={{ ...(error && { "*": { color: "error.main" } }) }}
          />
        }
        slotProps={{
          typography: {
            sx: {
              color: error ? "error.main" : "text.secondary",
            },
          },
        }}
        sx={[
          {
            minHeight: 42,
            margin: 0,
            paddingX: 0.5,
            paddingY: 1,
            borderRadius: 1,
            border: 1,
            borderColor: (theme) =>
              theme.palette.mode === "light" ? "grey.400" : "grey.700",
          },
          !params.disabled && {
            "&:hover": { borderColor: "action.active" },

            "&:focus-within": {
              outlineOffset: -2,
              outline: 1,
              outlineColor: "primary.main",
              borderColor: "primary.main",
            },

            ...(error && {
              borderColor: "error.main",

              "&:hover": { borderColor: "error.main" },

              "&:focus-within": {
                outlineOffset: -2,
                outline: 1,
                outlineColor: "error.main",
                borderColor: "error.main",
              },
            }),
          },
        ]}
      />

      {(Boolean(error) || Boolean(field.helperText)) && (
        <Box
          sx={{
            marginLeft: 2,
            color: error ? "error.main" : "text.secondary",
          }}
        >
          <RichTextReadOnly
            extensions={BASE_MUI_TIPTAP_EXTENSIONS}
            content={error?.message || field.helperText}
          />
        </Box>
      )}
    </FormControl>
  );
}
