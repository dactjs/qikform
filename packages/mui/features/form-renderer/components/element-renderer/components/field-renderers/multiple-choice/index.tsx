"use client";

import {
  Box,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { ClearAll as ClearIcon } from "@mui/icons-material";
import { RichTextReadOnly } from "mui-tiptap";
import { useController } from "react-hook-form";

import type { MultipleChoiceField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "@/lib";

import type { FormRendererValues } from "../../../../../types";

export function MultipleChoiceFieldRenderer({
  field,
}: {
  field: MultipleChoiceField;
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

  const handleOnChange = (option: string) => () => {
    if (state === null || !Array.isArray(state)) {
      onChange([option]);
      return;
    }

    if (state.includes(option)) {
      const valid = state.filter((item) => item !== option);
      onChange(valid.length > 0 ? valid : null);
    } else {
      onChange(state.concat(option));
    }
  };

  const handleClear = (): void => {
    onChange(null);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      required={field.rules.required}
      error={Boolean(error)}
    >
      <Box
        component="fieldset"
        sx={[
          {
            margin: 0,
            paddingX: 1.5,
            paddingBottom: 0.5,
            color: error ? "error.main" : "text.primary",
            borderRadius: 1,
            border: 1,
            borderColor: (theme) =>
              theme.palette.mode === "light" ? "grey.400" : "grey.700",
          },
          !params.disabled && {
            "&:hover": { borderColor: "action.active" },

            "&:focus-within": {
              paddingX: 1.4,
              paddingBottom: 0.4,
              border: 2,
              borderColor: "primary.main",
            },

            ...(error && {
              borderColor: "error.main",

              "&:hover": { borderColor: "error.main" },

              "&:focus-within": {
                paddingX: 1.4,
                paddingBottom: 0.4,
                border: 2,
                borderColor: "error.main",
              },
            }),
          },
        ]}
      >
        <FormLabel
          component="legend"
          id={`${field.name}-label`}
          sx={{
            marginX: -0.5,
            paddingX: 0.5,
            fontSize: "caption.fontSize",
          }}
        >
          {field.label}
        </FormLabel>

        <FormGroup
          aria-labelledby={`${field.name}-label`}
          sx={{ paddingX: 0.5, paddingBottom: 0.5 }}
        >
          {field.options.map((option, index) => {
            const key = `${index}-${option}`;

            const checked = Array.isArray(state) && state.includes(option);

            return (
              <FormControlLabel
                {...params}
                key={key}
                label={option}
                control={
                  <Checkbox
                    color={error ? "error" : "primary"}
                    checked={checked}
                    onChange={handleOnChange(option)}
                    sx={{ ...(error && { "*": { color: "error.main" } }) }}
                  />
                }
                slotProps={{
                  ...(error && {
                    typography: {
                      sx: {
                        color: "error.main",
                      },
                    },
                  }),
                }}
              />
            );
          })}
        </FormGroup>

        {Boolean(state) && (
          <Button
            variant="outlined"
            size="small"
            endIcon={<ClearIcon />}
            onClick={handleClear}
            sx={{ width: "fit-content", marginBottom: 1 }}
          >
            Clear
          </Button>
        )}
      </Box>

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
