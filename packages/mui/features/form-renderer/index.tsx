"use client";

import { Paper, Stack, Divider } from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form } from "@qikform/core";

import { FormRendererProvider, useFormRenderer } from "./context";

import { Header } from "./components/header";
import { Content } from "./components/content";
import { SubmissionText } from "./components/submission-text";

import type { FormRendererValues } from "./types";

export interface FormRendererProps {
  onSubmit?: (values: FormRendererValues) => void | Promise<void>;
}

function FormRenderer({ onSubmit }: FormRendererProps): React.ReactElement {
  const {
    formState: { isSubmitSuccessful },
  } = useFormContext();

  const { form } = useFormRenderer();

  const { disablePadding, hideTitle, hideDescription, transparentBackground } =
    form.customization;

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
      spacing={2}
      divider={<Divider flexItem />}
      sx={{ ...(!disablePadding && { padding: 3 }) }}
    >
      {(!hideTitle || !hideDescription) && <Header />}
      <Content onSubmit={onSubmit} />
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
