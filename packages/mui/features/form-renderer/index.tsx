"use client";

import { Paper, Stack, Divider } from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form } from "@qikform/core";

import { FormRendererProvider, useFormRenderer } from "./context";
import { Header, Content, SubmissionText } from "./components";
import type { FormRendererValues } from "./types";

function FormRenderer(): React.ReactElement {
  const {
    formState: { isSubmitSuccessful },
  } = useFormContext();

  const { form } = useFormRenderer();

  const { hideTitle, hideDescription, disablePadding, transparentBackground } =
    form.customization;

  const showHeader = !hideTitle || !hideDescription;

  if (isSubmitSuccessful) {
    return (
      <Stack
        component={Paper}
        elevation={transparentBackground ? 0 : 1}
        sx={[{ padding: 4 }, disablePadding && { padding: 0 }]}
      >
        <SubmissionText />
      </Stack>
    );
  }

  return (
    <Stack
      component={Paper}
      elevation={transparentBackground ? 0 : 1}
      spacing={2}
      divider={<Divider flexItem />}
      sx={[{ padding: 4 }, disablePadding && { padding: 0 }]}
    >
      {Boolean(showHeader) && <Header />}
      <Content />
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
    <FormRendererProvider form={form} onSubmit={onSubmit}>
      <FormRenderer />
    </FormRendererProvider>
  );
}

export { FormRendererWrapper as FormRenderer };

////////////////
// Re-exports //
////////////////

export type { FormRendererValues } from "./types";
