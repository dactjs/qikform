"use client";

import { Stack, Divider } from "@mui/material";

import { FormElementType } from "@qikform/core";

import { NoData } from "../../../../components";

import { useFormBuilder } from "../../context";

import {
  Header,
  TextBlockSettings,
  ImageBlockSettings,
  CodeBlockSettings,
  DividerBlockSettings,
  PlainTextFieldSettings,
  RichTextFieldSettings,
  NumberFieldSettings,
  EmailFieldSettings,
  PhoneFieldSettings,
  CheckboxFieldSettings,
  SwitchFieldSettings,
  TimeFieldSettings,
  DateFieldSettings,
  DateTimeFieldSettings,
} from "./components";

export function ElementDrawer(): React.ReactElement {
  const { selectedElement } = useFormBuilder();

  if (!selectedElement) {
    return <NoData message="Select an element from the elements list" />;
  }

  return (
    <Stack
      spacing={1.5}
      divider={<Divider flexItem />}
      sx={{ position: "relative" }}
    >
      <Header />

      {selectedElement.type === FormElementType.TEXT && (
        <TextBlockSettings block={selectedElement} />
      )}

      {selectedElement.type === FormElementType.IMAGE && (
        <ImageBlockSettings block={selectedElement} />
      )}

      {selectedElement.type === FormElementType.CODE && (
        <CodeBlockSettings block={selectedElement} />
      )}

      {selectedElement.type === FormElementType.DIVIDER && (
        <DividerBlockSettings block={selectedElement} />
      )}

      {selectedElement.type === FormElementType.PLAIN_TEXT && (
        <PlainTextFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.RICH_TEXT && (
        <RichTextFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.NUMBER && (
        <NumberFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.EMAIL && (
        <EmailFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.PHONE && (
        <PhoneFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.CHECKBOX && (
        <CheckboxFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.SWITCH && (
        <SwitchFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.TIME && (
        <TimeFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.DATE && (
        <DateFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.DATE_TIME && (
        <DateTimeFieldSettings field={selectedElement} />
      )}
    </Stack>
  );
}
