"use client";

import { Box, FormControl, FormLabel } from "@mui/material";
import type { RichTextEditorProps } from "mui-tiptap";
import {
  RichTextEditor,
  RichTextReadOnly,
  MenuControlsContainer,
  MenuSelectHeading,
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonStrikethrough,
  MenuButtonCode,
  MenuButtonAlignLeft,
  MenuButtonAlignCenter,
  MenuButtonAlignJustify,
  MenuButtonAlignRight,
  MenuDivider,
} from "mui-tiptap";
import { Placeholder } from "@tiptap/extension-placeholder";
import { CharacterCount } from "@tiptap/extension-character-count";
import { useController } from "react-hook-form";

import type { RichTextField } from "@qikform/core";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../../../../../lib";

import type { FormRendererValues } from "../../../../types";

export function RichTextFieldRenderer({
  field,
}: {
  field: RichTextField;
}): React.ReactElement {
  const {
    field: { disabled, value: state, onChange, ...params },
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

  const extensions = [
    ...BASE_MUI_TIPTAP_EXTENSIONS,
    Placeholder.configure({
      placeholder: field.placeholder || "Write something...",
    }),
    CharacterCount.configure({
      limit: field.rules.maxCharacters,
    }),
  ];

  const controls = (
    <MenuControlsContainer>
      {Boolean(field.label) && (
        <>
          <FormLabel>{field.label}</FormLabel>
          <MenuDivider />
        </>
      )}

      <MenuSelectHeading />

      <MenuDivider />

      <MenuButtonBold />
      <MenuButtonItalic />
      <MenuButtonStrikethrough />
      <MenuButtonCode />

      <MenuDivider />

      <MenuButtonAlignLeft />
      <MenuButtonAlignCenter />
      <MenuButtonAlignJustify />
      <MenuButtonAlignRight />
    </MenuControlsContainer>
  );

  const content = typeof state === "string" ? state : null;

  const handleOnUpdate: RichTextEditorProps["onUpdate"] = ({ editor }) => {
    const isEmpty = editor.isEmpty;
    const html = editor.getHTML();
    onChange(isEmpty ? null : html);
  };

  return (
    <FormControl
      {...params}
      fullWidth
      required={field.rules.required}
      error={Boolean(error)}
      sx={{
        ...(!disabled && {
          ...(error && {
            "&& .MuiTiptap-FieldContainer-notchedOutline": {
              borderColor: "error.main",
            },

            "&& .MuiTiptap-FieldContainer-notchedOutline:focus-within": {
              outlineOffset: -2,
              outline: 1,
              outlineColor: "error.main",
              borderColor: "error.main",
            },
          }),
        }),
      }}
    >
      <RichTextEditor
        editorDependencies={[field.placeholder, field.rules.maxCharacters]}
        extensions={extensions}
        renderControls={() => controls}
        editable={!disabled}
        content={content}
        onUpdate={handleOnUpdate}
      />

      {(Boolean(error) || Boolean(field.helperText)) && (
        <Box
          sx={{
            marginLeft: 2,
            color: error ? "error.main" : "text.secondary",
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
