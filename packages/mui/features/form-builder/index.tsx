"use client";

import { Box, Alert } from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form } from "@qikform/core";

import { FormRenderer } from "../form-renderer";

import { FormBuilderProvider, useFormBuilder } from "./context";
import { Header, FormDrawer, ElementDrawer } from "./components";

export interface FormBuilderProps {
  toolbarContent?: React.ReactElement;
}

function FormBuilder({ toolbarContent }: FormBuilderProps): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const { selectedElement } = useFormBuilder();

  const form = watch();

  return (
    <Box
      sx={{
        position: "relative",
        display: { md: "grid" },
        height: "100%",
        overflowX: "hidden",
        overflowY: { md: "hidden" },
        gridTemplateRows: { md: "auto 1fr" },
        gridTemplateColumns: { md: "minmax(20em, 1fr) 2fr minmax(16em, 1fr)" },
        gridTemplateAreas: {
          md: selectedElement
            ? `
                "header header header"
                "form-drawer form-renderer element-drawer"
              `
            : `
                "header header header"
                "form-drawer form-renderer form-renderer"
              `,
        },
      }}
    >
      <Box sx={{ gridArea: { md: "header" } }}>
        <Header>{toolbarContent}</Header>
      </Box>

      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: "appBar",
          display: { md: "none" },
        }}
      >
        <Alert severity="info">
          Please build this form on a device with a larger screen. That will
          allow you to preview your form changes.
        </Alert>
      </Box>

      <Box
        sx={{
          gridArea: { md: "form-drawer" },
          height: { md: "100%" },
          padding: 1.5,
          overflowX: "hidden",
          overflowY: { md: "auto" },
          borderRight: { md: 2 },
          borderRightColor: { md: "divider" },
        }}
      >
        <FormDrawer />
      </Box>

      <Box
        sx={{
          gridArea: { md: "form-renderer" },
          display: { xs: "none", md: "block" },
          height: { md: "100%" },
          padding: 2,
          overflow: { md: "auto" },
        }}
      >
        <FormRenderer form={form} />
      </Box>

      {Boolean(selectedElement) && (
        <Box
          sx={{
            gridArea: { md: "element-drawer" },
            height: { md: "100%" },
            padding: 1.5,
            overflowX: "hidden",
            overflowY: { md: "auto" },
            borderLeft: { md: 2 },
            borderLeftColor: { md: "divider" },
          }}
        >
          <ElementDrawer />
        </Box>
      )}
    </Box>
  );
}

interface FormBuilderWrapperProps {
  form: Form;
  toolbarContent?: React.ReactElement;
  onSave?: (form: Form) => void | Promise<void>;
}

function FormBuilderWrapper({
  form,
  toolbarContent,
  onSave,
}: FormBuilderWrapperProps): React.ReactElement {
  return (
    <FormBuilderProvider form={form} onSave={onSave}>
      <FormBuilder toolbarContent={toolbarContent} />
    </FormBuilderProvider>
  );
}

export { FormBuilderWrapper as FormBuilder };

////////////////
// Re-exports //
////////////////

export {
  objectURLFileURLBuildStrategy,
  base64FileURLBuildStrategy,
} from "./utils";

export type { FileURLBuildStrategy } from "./types";
