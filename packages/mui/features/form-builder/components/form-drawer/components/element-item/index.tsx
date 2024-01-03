"use client";

import { useState } from "react";
import { Stack, IconButton } from "@mui/material";
import { DragHandle as SortIcon } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useFormContext } from "react-hook-form";

import type { Form, FormElement } from "@qikform/core";

import { FormElementItemContent, FormElementItemActions } from "./components";

export interface FormElementItemProps {
  filtering: boolean;
  element: FormElement;
}

export function FormElementItem({
  filtering,
  element,
}: FormElementItemProps): React.ReactElement {
  const {
    formState: { errors },
    watch,
  } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex(({ id }) => id === element.id);

  const isElementError = Boolean(errors.elements?.[index]);

  const [hovering, setHovering] = useState(false);

  const handleHover = (): void => {
    setHovering(true);
  };

  const handleBlur = (): void => {
    setHovering(false);
  };

  const {
    attributes,
    listeners,
    transition,
    transform,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({
    id: element.id,
    data: {
      elementIndex: index,
      type: element.type,
      name: element.name,
      label: element.label,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Stack
      ref={setNodeRef}
      component="li"
      direction="row"
      alignItems="center"
      spacing={1}
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      style={style}
      sx={{
        padding: (theme) => theme.spacing(1, 0.5),
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        ":last-of-type": { borderBottom: "none" },
        ...(isElementError && { color: "error.main" }),
      }}
    >
      {!filtering && (
        <IconButton
          {...attributes}
          {...listeners}
          ref={setActivatorNodeRef}
          size="small"
          color="inherit"
          aria-label="Sort Element (Drag / Drop)"
        >
          <SortIcon fontSize="small" />
        </IconButton>
      )}

      <FormElementItemContent element={element} />
      <FormElementItemActions show={hovering} element={element} />
    </Stack>
  );
}
