"use client";

import { FormControl, FormLabel, FormHelperText } from "@mui/material";
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
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export interface ControlledRichEditorProps
  extends UseControllerProps<Record<string, unknown>> {
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
    StarterKit.configure({
      bulletList: false,
      orderedList: false,
    }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
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

  return (
    <FormControl
      fullWidth
      required={Boolean(rules?.required)}
      error={Boolean(error)}
      sx={{
        ...(!disabled && {
          ...(error && {
            "&& .MuiTiptap-FieldContainer-notchedOutline": {
              borderColor: (theme) => `${theme.palette.error.main}`,
            },

            "&& .MuiTiptap-FieldContainer-notchedOutline:focus": {
              borderColor: (theme) => `${theme.palette.error.main}`,
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
        onUpdate={(content) => {
          const isEmpty = content.editor.isEmpty;
          const html = content.editor.getHTML();
          onChange(isEmpty ? null : html);
        }}
      />

      {(Boolean(error) || Boolean(helperText)) && (
        <FormHelperText>{error?.message || helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
