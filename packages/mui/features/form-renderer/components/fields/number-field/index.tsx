import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { useController } from "react-hook-form";

import type { NumberField } from "@qikform/core";

import type { FormRendererValues } from "../../../types";

export function NumberFieldRenderer({
  field,
}: {
  field: NumberField;
}): React.ReactElement {
  const {
    field: { value, onChange, ...params },
    fieldState: { error },
  } = useController<FormRendererValues>({
    name: field.name,
    defaultValue: field.defaultValue,
    rules: {
      required: {
        value: field.rules.required,
        message: "Required",
      },
      ...(typeof field.rules.min === "number" && {
        min: {
          value: field.rules.min,
          message: `Minimum value is ${field.rules.min}`,
        },
      }),
      ...(typeof field.rules.max === "number" && {
        max: {
          value: field.rules.max,
          message: `Maximum value is ${field.rules.max}`,
        },
      }),
    },
  });

  const extensions = [
    StarterKit,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ];

  const isValidNumber = (text: unknown): boolean => {
    return text !== "" && text !== undefined && text !== null;
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const text = event.target.value;

    onChange(isValidNumber(text) ? Number(text) : null);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      required={field.rules.required}
      error={Boolean(error)}
    >
      {Boolean(field.label) && (
        <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
      )}

      <OutlinedInput
        {...params}
        id={field.id}
        type="number"
        label={field.label}
        placeholder={field.placeholder as string | undefined}
        value={isValidNumber(value) ? Number(value) : ""}
        onChange={handleOnChange}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />

      {(Boolean(error) || Boolean(field.helperText)) && (
        <Box
          sx={{
            color: ({ palette }) =>
              error ? palette.error.main : palette.text.secondary,
          }}
        >
          <RichTextReadOnly
            extensions={extensions}
            content={error?.message || field.helperText}
          />
        </Box>
      )}
    </FormControl>
  );
}
