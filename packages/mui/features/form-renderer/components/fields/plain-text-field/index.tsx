import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { useController } from "react-hook-form";

import type { PlainTextField } from "@qikform/core";

import type { FormRendererValues } from "../../../types";

export function PlainTextFieldRenderer({
  field,
}: {
  field: PlainTextField;
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
      ...(typeof field.rules.minLength === "number" && {
        minLength: {
          value: field.rules.minLength,
          message: `Minimum characters is ${field.rules.minLength}`,
        },
      }),
      ...(typeof field.rules.maxLength === "number" && {
        maxLength: {
          value: field.rules.maxLength,
          message: `Maximum characters is ${field.rules.maxLength}`,
        },
      }),
    },
  });

  const extensions = [
    StarterKit,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ];

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const text = event.target.value;

    onChange(text || null);
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
        label={field.label}
        placeholder={field.placeholder as string | undefined}
        value={typeof value === "string" ? value : ""}
        onChange={handleOnChange}
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
