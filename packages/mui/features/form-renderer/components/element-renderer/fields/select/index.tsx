"use client";

import type { SelectChangeEvent } from "@mui/material";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";

import type { SelectField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../../lib";

import type { FormRendererValues } from "../../../../types";

export function SelectFieldRenderer({
  field,
}: {
  field: SelectField;
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

  const showLabel = Boolean(field.label) && !field.placeholder;

  const normalizeValue = (value: unknown): string | string[] => {
    if (field.configuration.multiple) {
      if (!Array.isArray(value)) return [];

      const valid = value.filter((option) => field.options.includes(option));

      return valid as string[];
    }

    return typeof value === "string" && field.options.includes(value)
      ? value
      : "";
  };

  const value = normalizeValue(state);

  const handleOnChange = (
    event: SelectChangeEvent<string | string[]>
  ): void => {
    const selected = event.target.value;

    if (typeof selected === "string") {
      onChange(selected || null);
      return;
    }

    const valid = selected.filter((option) => field.options.includes(option));
    onChange(valid.length > 0 ? valid : null);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      required={field.rules.required}
      error={Boolean(error)}
    >
      {Boolean(showLabel) && (
        <InputLabel id={`${field.name}-select-label`}>{field.label}</InputLabel>
      )}

      <Select
        {...params}
        {...(showLabel && {
          id: `${field.name}-select`,
          labelId: `${field.name}-select-label`,
          label: field.label,
        })}
        multiple={field.configuration.multiple}
        required={field.rules.required}
        displayEmpty={Boolean(field.placeholder)}
        renderValue={(selected) => {
          if (typeof selected === "string") {
            return (
              <Typography
                component={selected ? "span" : "em"}
                color={selected ? "text.primary" : "text.secondary"}
              >
                {selected || field.placeholder}
              </Typography>
            );
          }

          return (
            <Typography
              component={selected.length > 0 ? "span" : "em"}
              color={selected.length > 0 ? "text.primary" : "text.secondary"}
            >
              {selected.length > 0 ? selected.join(", ") : field.placeholder}
            </Typography>
          );
        }}
        value={value}
        onChange={handleOnChange}
      >
        <MenuItem
          disabled={field.configuration.multiple}
          value={field.configuration.multiple ? [] : ""}
          sx={{ color: "text.secondary" }}
        >
          <em>--</em>
        </MenuItem>

        {field.options.map((option, index) => {
          const key = `${index}-${option}`;

          return (
            <MenuItem key={key} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>

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
