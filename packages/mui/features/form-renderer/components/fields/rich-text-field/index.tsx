"use client";

import { Box, FormControl, FormLabel } from "@mui/material";
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
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";
import { CharacterCount } from "@tiptap/extension-character-count";
import { useController } from "react-hook-form";

import type { RichTextField } from "@qikform/core";

import type { FormRendererValues } from "../../../types";

export function RichTextFieldRenderer({
  field,
}: {
  field: RichTextField;
}): React.ReactElement {
  const {
    field: { disabled, value, onChange },
    fieldState: { error },
  } = useController<FormRendererValues>({
    name: field.name,
    defaultValue: field.defaultValue,
    rules: {
      required: {
        value: field.rules.required,
        message: "Required",
      },
    },
  });

  const extensions = [
    StarterKit.configure({
      bulletList: false,
      orderedList: false,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
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

  return (
    <FormControl
      fullWidth
      required={field.rules.required}
      error={Boolean(error)}
    >
      <RichTextEditor
        editorDependencies={[field.placeholder, field.rules.maxCharacters]}
        extensions={extensions}
        renderControls={() => controls}
        editable={!disabled}
        content={typeof value === "string" ? value : field.defaultValue || null}
        onUpdate={(content) => {
          const isEmpty = content.editor.isEmpty;
          const html = content.editor.getHTML();
          onChange(isEmpty ? null : html);
        }}
      />

      {(Boolean(error) || Boolean(field.helperText)) && (
        <Box
          sx={{
            marginLeft: 2,
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
