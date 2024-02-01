"use client";

import { Box } from "@mui/material";

import type { FormElement } from "@qikform/core";
import { FormElementType } from "@qikform/core";

import { useFormRenderer } from "../../context";

import {
  FormRendererTextBlockRenderer as TextBlockRenderer,
  FormRendererImageBlockRenderer as ImageBlockRenderer,
  FormRendererCodeBlockRenderer as CodeBlockRenderer,
  FormRendererDividerBlockRenderer as DividerBlockRenderer,
} from "./blocks";
import {
  FormRendererPlainTextFieldRenderer as PlainTextFieldRenderer,
  FormRendererRichTextFieldRenderer as RichTextFieldRenderer,
  FormRendererNumberFieldRenderer as NumberFieldRenderer,
  FormRendererEmailFieldRenderer as EmailFieldRenderer,
  FormRendererPhoneFieldRenderer as PhoneFieldRenderer,
  FormRendererURLFieldRenderer as URLFieldRenderer,
  FormRendererCheckboxFieldRenderer as CheckboxFieldRenderer,
  FormRendererSwitchFieldRenderer as SwitchFieldRenderer,
  FormRendererSingleChoiceFieldRenderer as SingleChoiceFieldRenderer,
  FormRendererMultipleChoiceFieldRenderer as MultipleChoiceFieldRenderer,
  FormRendererSelectFieldRenderer as SelectFieldRenderer,
  FormRendererTimeFieldRenderer as TimeFieldRenderer,
  FormRendererDateFieldRenderer as DateFieldRenderer,
  FormRendererDateTimeFieldRenderer as DateTimeFieldRenderer,
} from "./fields";

export interface FormRendererElementRendererProps {
  element: FormElement;
}

export function FormRendererElementRenderer({
  element,
}: FormRendererElementRendererProps): React.ReactNode {
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
