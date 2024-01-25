"use client";

import { Box } from "@mui/material";

import type { FormElement } from "@qikform/core";
import { FormElementType } from "@qikform/core";

import { useFormRenderer } from "../../context";

import {
  TextBlockRenderer,
  ImageBlockRenderer,
  CodeBlockRenderer,
  DividerBlockRenderer,
} from "./blocks";
import {
  PlainTextFieldRenderer,
  RichTextFieldRenderer,
  NumberFieldRenderer,
  EmailFieldRenderer,
  PhoneFieldRenderer,
  URLFieldRenderer,
  CheckboxFieldRenderer,
  SwitchFieldRenderer,
  SingleChoiceFieldRenderer,
  MultipleChoiceFieldRenderer,
  SelectFieldRenderer,
  TimeFieldRenderer,
  DateFieldRenderer,
  DateTimeFieldRenderer,
} from "./fields";

export interface ElementRendererProps {
  element: FormElement;
}

export function ElementRenderer({
  element,
}: ElementRendererProps): React.ReactNode {
  const { visibleElements } = useFormRenderer();

  const isVisible = visibleElements.some(({ id }) => id === element.id);

  return (
    <Box
      key={element.id} // the key is used to force the component to re-render when the element is duplicated
      sx={[{ marginBottom: 2 }, !isVisible && { display: "none" }]}
    >
      {element.type === FormElementType.TEXT && (
        <TextBlockRenderer block={element} />
      )}

      {element.type === FormElementType.IMAGE && (
        <ImageBlockRenderer block={element} />
      )}

      {element.type === FormElementType.CODE && (
        <CodeBlockRenderer block={element} />
      )}

      {element.type === FormElementType.DIVIDER && (
        <DividerBlockRenderer block={element} />
      )}

      {element.type === FormElementType.PLAIN_TEXT && (
        <PlainTextFieldRenderer field={element} />
      )}

      {element.type === FormElementType.RICH_TEXT && (
        <RichTextFieldRenderer field={element} />
      )}

      {element.type === FormElementType.NUMBER && (
        <NumberFieldRenderer field={element} />
      )}

      {element.type === FormElementType.EMAIL && (
        <EmailFieldRenderer field={element} />
      )}

      {element.type === FormElementType.PHONE && (
        <PhoneFieldRenderer field={element} />
      )}

      {element.type === FormElementType.URL && (
        <URLFieldRenderer field={element} />
      )}

      {element.type === FormElementType.CHECKBOX && (
        <CheckboxFieldRenderer field={element} />
      )}

      {element.type === FormElementType.SWITCH && (
        <SwitchFieldRenderer field={element} />
      )}

      {element.type === FormElementType.SINGLE_CHOICE && (
        <SingleChoiceFieldRenderer field={element} />
      )}

      {element.type === FormElementType.MULTIPLE_CHOICE && (
        <MultipleChoiceFieldRenderer field={element} />
      )}

      {element.type === FormElementType.SELECT && (
        <SelectFieldRenderer field={element} />
      )}

      {element.type === FormElementType.TIME && (
        <TimeFieldRenderer field={element} />
      )}

      {element.type === FormElementType.DATE && (
        <DateFieldRenderer field={element} />
      )}

      {element.type === FormElementType.DATE_TIME && (
        <DateTimeFieldRenderer field={element} />
      )}
    </Box>
  );
}
