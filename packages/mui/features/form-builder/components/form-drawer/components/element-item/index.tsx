"use client";

import { Stack, IconButton } from "@mui/material";
import { DragHandle as SortIcon } from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { FormElement } from "@qikform/core";

import { ElementItemContent } from "../element-item-content";
import { ElementItemActions } from "../element-item-actions";

import { useElementItem } from "./hooks";

export interface ElementItemProps {
  filtering: boolean;
  element: FormElement;
}

export function ElementItem({
  filtering,
  element,
}: ElementItemProps): React.ReactElement {
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
      type: element.type,
      name: element.name,
      label: element.label,
    },
  });

  const { hasError, hovering, onHover, onBlur } = useElementItem(element);

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
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      style={style}
      sx={{
        paddingX: 0.5,
        paddingY: 1,
        borderBottom: 1,
        borderBottomColor: "divider",
        ":last-of-type": { borderBottom: "none" },
        ...(hasError && { color: "error.main" }),
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

      <ElementItemContent element={element} />
      <ElementItemActions show={hovering} element={element} />
    </Stack>
  );
}
