"use client";

import { Stack } from "@mui/material";

import { NoData } from "../../../../components";

import { useFormRenderer } from "../../context";

import { FormRendererElementRenderer as ElementRenderer } from "../element-renderer";
import { FormRendererPagination as Pagination } from "../pagination";

export function FormRendererContent(): React.ReactElement {
  const { form, visibleElements, endSubmission } = useFormRenderer();

  if (form.elements.length === 0) {
    return (
      <NoData
        message="No elements to display"
        sx={{ paddingTop: 1, paddingBottom: 0 }}
      />
    );
  }

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={endSubmission as unknown as React.FormEventHandler}
    >
      {visibleElements.length === 0 && (
        <NoData
          message="No elements to display"
          sx={{ marginBottom: 2, paddingTop: 1, paddingBottom: 0 }}
        />
      )}

      {form.elements.map((element) => (
        <ElementRenderer key={element.id} element={element} />
      ))}

      <Pagination />
    </Stack>
  );
}
