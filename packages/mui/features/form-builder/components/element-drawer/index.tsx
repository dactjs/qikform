"use client";

import { Stack, Divider } from "@mui/material";

import { FormElementType } from "@qikform/core";

import { NoData } from "@/components";

import { useFormBuilder } from "../../context";

import { ElementDrawerHeader } from "./header";
import {
  TextBlockSettings,
  ImageBlockSettings,
  CodeBlockSettings,
  DividerBlockSettings,
  PageBreakBlockSettings,
} from "./blocks";
import {
  PlainTextFieldSettings,
  RichTextFieldSettings,
  NumberFieldSettings,
  EmailFieldSettings,
  PhoneFieldSettings,
  URLFieldSettings,
  CheckboxFieldSettings,
  SwitchFieldSettings,
  SingleChoiceFieldSettings,
  MultipleChoiceFieldSettings,
  SelectFieldSettings,
  TimeFieldSettings,
  DateFieldSettings,
  DateTimeFieldSettings,
} from "./fields";

export function FormBuilderElementDrawer(): React.ReactElement {
  const { selectedElement } = useFormBuilder();

  if (!selectedElement) {
    return (
      <NoData
        message="Select an element from the elements list"
        sx={{ height: "100%" }}
      />
    );
  }

  return (
    <Stack
      key={selectedElement.id} // the key is used to force the component to re-render when the element is duplicated
      spacing={1.5}
      divider={<Divider flexItem />}
      sx={{ position: "relative" }}
    >
      <ElementDrawerHeader />

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

      {selectedElement.type === FormElementType.PAGE_BREAK && (
        <PageBreakBlockSettings block={selectedElement} />
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

      {selectedElement.type === FormElementType.URL && (
        <URLFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.CHECKBOX && (
        <CheckboxFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.SWITCH && (
        <SwitchFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.SINGLE_CHOICE && (
        <SingleChoiceFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.MULTIPLE_CHOICE && (
        <MultipleChoiceFieldSettings field={selectedElement} />
      )}

      {selectedElement.type === FormElementType.SELECT && (
        <SelectFieldSettings field={selectedElement} />
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
