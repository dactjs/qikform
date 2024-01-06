import { Box } from "@mui/material";

import type { FormElement } from "@qikform/core";
import { FormElementType } from "@qikform/core";

import {
  TextBlockRenderer,
  ImageBlockRenderer,
  CodeBlockRenderer,
  DividerBlockRenderer,
} from "../blocks";
import {
  PlainTextFieldRenderer,
  RichTextFieldRenderer,
  NumberFieldRenderer,
  EmailFieldRenderer,
  PhoneFieldRenderer,
  CheckboxFieldRenderer,
  SwitchFieldRenderer,
  SingleChoiceFieldRenderer,
  MultipleChoiceFieldRenderer,
  TimeFieldRenderer,
  DateFieldRenderer,
  DateTimeFieldRenderer,
} from "../fields";

export interface ElementRendererProps {
  hidden: boolean;
  element: FormElement;
}

export function ElementRenderer({
  hidden,
  element,
}: ElementRendererProps): React.ReactNode {
  return (
    <Box
      key={element.id}
      sx={[{ marginBottom: 2 }, hidden && { display: "none" }]}
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
