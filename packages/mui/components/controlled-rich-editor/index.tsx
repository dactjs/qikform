"use client";

import { FormControl, FormLabel, FormHelperText } from "@mui/material";
import type { RichTextEditorProps } from "mui-tiptap";
import {
  RichTextEditor,
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
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

import { BASE_MUI_TIPTAP_EXTENSIONS } from "../../lib";

export interface ControlledRichEditorProps
  extends UseControllerProps<Record<string, unknown>> {
  required?: boolean;
  label?: string | null;
  placeholder?: string | null;
  helperText?: string | null;
}

export function ControlledRichEditor({
  name,
  control,
  disabled,
  defaultValue,
  rules,
  shouldUnregister,
  required,
  label,
  placeholder,
  helperText,
}: ControlledRichEditorProps): React.ReactElement {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    disabled,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const extensions = [
    ...BASE_MUI_TIPTAP_EXTENSIONS,
    Placeholder.configure({ placeholder: placeholder || "Write something..." }),
  ];

  const controls = (
    <MenuControlsContainer>
      {Boolean(label) && (
        <>
          <FormLabel>{label}</FormLabel>
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

  const handleOnUpdate: RichTextEditorProps["onUpdate"] = (content) => {
    const isEmpty = content.editor.isEmpty;

    const html = content.editor.getHTML();

    onChange(isEmpty ? null : html);
  };

  return (
    <FormControl
      fullWidth
      required={required}
      error={Boolean(error)}
      sx={{
        ...(!disabled && {
          ...(error && {
            "&& .MuiTiptap-FieldContainer-notchedOutline": {
              borderColor: "error.main",
            },

            "&& .MuiTiptap-FieldContainer-notchedOutline:focus-within": {
              borderColor: "error.main",
            },
          }),
        }),
      }}
    >
      <RichTextEditor
        editorDependencies={[placeholder]}
        extensions={extensions}
        renderControls={() => controls}
        editable={!disabled}
        content={typeof value === "string" ? value : defaultValue || null}
        onBlur={onBlur}
        onUpdate={handleOnUpdate}
      />

      {(Boolean(error) || Boolean(helperText)) && (
        <FormHelperText>{error?.message || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
