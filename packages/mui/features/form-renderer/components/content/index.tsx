"use client";

import { Box, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { FormElementType } from "@qikform/core";

import { NoData } from "../../../../components";

import { useFormRenderer } from "../../context";
import type { FormRendererValues } from "../../types";

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
import { Pagination } from "../pagination";

export interface ContentProps {
  onSubmit?: (values: FormRendererValues) => void | Promise<void>;
}

export function Content({ onSubmit }: ContentProps): React.ReactElement {
  const { handleSubmit } = useFormContext();

  const { pages, currentPage } = useFormRenderer();

  const elements = pages.flatMap((page) => page.elements);

  const content = pages.find((page) => page.number === currentPage);

  const handleOnSubmit = async (values: FormRendererValues): Promise<void> => {
    if (!onSubmit) return;

    await onSubmit(values);
  };

  if (elements.length === 0) return <NoData message="No elements to display" />;

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(handleOnSubmit) as () => void}
    >
      {content?.elements.length === 0 && (
        <NoData
          message="No elements to display"
          sx={{ paddingTop: 2, paddingBottom: 4 }}
        />
      )}

      {elements.map((element) => {
        const showElement = content?.elements.some(
          ({ id }) => id === element.id
        );

        return (
          <Box
            key={element.id}
            sx={{ display: showElement ? "block" : "none", marginBottom: 2 }}
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
      })}

      <Pagination />
    </Stack>
  );
}
