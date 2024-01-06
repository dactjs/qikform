"use client";

import { useMemo } from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { FormElement } from "@qikform/core";

import { NoData } from "../../../../components";

import { useFormRenderer } from "../../context";
import type { FormRendererValues } from "../../types";

import { ElementRenderer } from "../element-renderer";
import { Pagination } from "../pagination";

export interface ContentProps {
  onSubmit?: (values: FormRendererValues) => void | Promise<void>;
}

export function Content({ onSubmit }: ContentProps): React.ReactElement {
  const { handleSubmit } = useFormContext();

  const { pages, currentPage } = useFormRenderer();

  const elements = useMemo<FormElement[]>(
    () => pages.flatMap((page) => page.elements),
    [pages]
  );

  const visibleElements = useMemo(() => {
    const current = pages.find((page) => page.number === currentPage);

    return current?.elements ?? [];
  }, [pages, currentPage]);

  const handleOnSubmit = async (values: FormRendererValues): Promise<void> => {
    if (!onSubmit) return;

    await onSubmit(values);
  };

  if (elements.length === 0) {
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
      onSubmit={handleSubmit(handleOnSubmit) as () => void}
    >
      {visibleElements.length === 0 && (
        <NoData
          message="No elements to display"
          sx={{ marginBottom: 2, paddingTop: 1, paddingBottom: 0 }}
        />
      )}

      {elements.map((element) => {
        const isTheElementVisible = visibleElements.some(
          ({ id }) => id === element.id
        );

        return (
          <ElementRenderer
            key={element.id}
            hidden={!isTheElementVisible}
            element={element}
          />
        );
      })}

      <Pagination />
    </Stack>
  );
}
