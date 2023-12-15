"use client";

import { Fragment } from "react";
import { Paper, Stack, Divider, Typography, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form } from "@qikform/core";
import { FormElementType } from "@qikform/core";

import { NoData } from "../../components";

import { FormRendererProvider, useFormRenderer } from "./context";
import {
  TextBlockRenderer,
  ImageBlockRenderer,
  CodeBlockRenderer,
  DividerBlockRenderer,
} from "./components/blocks";
import {
  PlainTextFieldRenderer,
  RichTextFieldRenderer,
  NumberFieldRenderer,
  EmailFieldRenderer,
  CheckboxFieldRenderer,
  TimeFieldRenderer,
  DateFieldRenderer,
  DateTimeFieldRenderer,
} from "./components/fields";
import { SubmissionText } from "./components/submission-text";
import type { FormRendererValues } from "./types";

export interface FormRendererProps {
  onSubmit?: (values: FormRendererValues) => void | Promise<void>;
}

function FormRenderer({ onSubmit }: FormRendererProps): React.ReactElement {
  const {
    formState: { isSubmitSuccessful },
    handleSubmit,
  } = useFormContext();

  const { form } = useFormRenderer();

  const {
    disablePadding,
    hideTitle,
    hideDescription,
    transparentBackground,
    submitButtonText,
  } = form.customization;

  const elements = form.elements.filter(
    (element) => !element.configuration.hidden
  );

  const handleOnSubmit = async (values: FormRendererValues): Promise<void> => {
    if (!onSubmit) return;

    await onSubmit(values);
  };

  if (isSubmitSuccessful) {
    return (
      <Stack
        {...(!transparentBackground && { component: Paper })}
        sx={{ ...(!disablePadding && { padding: 4 }) }}
      >
        <SubmissionText />
      </Stack>
    );
  }

  return (
    <Stack
      {...(!transparentBackground && { component: Paper })}
      spacing={1}
      divider={<Divider flexItem />}
      sx={{ ...(!disablePadding && { padding: 3 }) }}
    >
      {(!hideTitle || !hideDescription) && (
        <Stack>
          {!hideTitle && (
            <Typography variant="h5" textAlign="center" fontWeight="bolder">
              {form.title}
            </Typography>
          )}

          {(!hideDescription || !form.description) && (
            <Typography
              component="pre"
              variant="body1"
              textAlign="center"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {form.description}
            </Typography>
          )}
        </Stack>
      )}

      {elements.length > 0 ? (
        <Stack
          component="form"
          noValidate
          autoComplete="off"
          spacing={2}
          onSubmit={handleSubmit(handleOnSubmit) as () => void}
        >
          {elements.map((element) => (
            <Fragment key={element.id}>
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

              {element.type === FormElementType.CHECKBOX && (
                <CheckboxFieldRenderer field={element} />
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
            </Fragment>
          ))}

          <Divider flexItem />

          <Button type="submit" variant="contained">
            {submitButtonText}
          </Button>
        </Stack>
      ) : (
        <NoData message="No elements to display" />
      )}
    </Stack>
  );
}

interface FormRendererWrapperProps {
  form: Form;
  onSubmit?: (values: FormRendererValues) => void | Promise<void>;
}

function FormRendererWrapper({
  form,
  onSubmit,
}: FormRendererWrapperProps): React.ReactElement {
  return (
    <FormRendererProvider form={form}>
      <FormRenderer onSubmit={onSubmit} />
    </FormRendererProvider>
  );
}

export { FormRendererWrapper as FormRenderer };

////////////////
// Re-exports //
////////////////

export type { FormRendererValues } from "./types";
