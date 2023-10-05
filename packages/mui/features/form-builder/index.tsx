"use client";

import { Box, Alert } from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form } from "@qikform/core";

import { FormRenderer } from "../form-renderer";

import { FormBuilderProvider, useFormBuilder } from "./context";
import { Header, FormDrawer, ElementDrawer } from "./components";

export interface FormBuilderProps {
  toolbarContent?: React.ReactElement;
  onSave?: (form: Form) => void | Promise<void>;
}

function FormBuilder({
  toolbarContent,
  onSave,
}: FormBuilderProps): React.ReactElement {
  const { selectedElement } = useFormBuilder();

  const { watch } = useFormContext<Form>();

  const form = watch();

  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        height: "100%",
        overflow: { xs: "auto", md: "hidden" },
        gridTemplateRows: { xs: "repeat(4, max-content)", md: "auto 1fr" },
        gridTemplateColumns: {
          xs: "1fr",
          md: "minmax(20em, 1fr) 2fr minmax(16em, 1fr)",
        },
        gridTemplateAreas: {
          xs: `
                "header"
                "alert"
                "form-drawer"
                "element-drawer"
              `,
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
      <Box sx={{ gridArea: "header" }}>
        <Header onSave={onSave}>{toolbarContent}</Header>
      </Box>

      <Box
        sx={{
          gridArea: "alert",
          position: "sticky",
          top: 0,
          zIndex: (theme) => theme.zIndex.appBar,
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
          gridArea: "form-drawer",
          height: { md: "100%" },
          padding: (theme) => ({
            xs: theme.spacing(0.5),
            md: theme.spacing(1.5),
          }),
          overflow: { md: "auto" },
          borderRight: (theme) => ({
            md: `2px solid ${theme.palette.divider}`,
          }),
        }}
      >
        <FormDrawer />
      </Box>

      <Box
        sx={{
          gridArea: "form-renderer",
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
            gridArea: "element-drawer",
            height: { md: "100%" },
            padding: (theme) => ({
              xs: theme.spacing(0.5),
              md: theme.spacing(1.5),
            }),
            overflow: { md: "auto" },
            borderLeft: (theme) => ({
              md: `2px solid ${theme.palette.divider}`,
            }),
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
    <FormBuilderProvider form={form}>
      <FormBuilder toolbarContent={toolbarContent} onSave={onSave} />
    </FormBuilderProvider>
  );
}

export { FormBuilderWrapper as FormBuilder };
