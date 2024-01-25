"use client";

import { Stack, TextField, IconButton } from "@mui/material";
import {
  DragHandle as SortIcon,
  RemoveCircle as DeleteIcon,
} from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useController } from "react-hook-form";

import type { Form } from "@qikform/core";

export interface SelectOptionItemProps {
  fieldIndex: number;
  optionIndex: number;
  sortableId: string;
  onRemove: () => void;
}

export function SelectOptionItem({
  fieldIndex,
  optionIndex,
  sortableId,
  onRemove,
}: SelectOptionItemProps): React.ReactElement {
  const {
    field: { value, onChange, ...params },
    fieldState: { error },
  } = useController<Form>({
    name: `elements.${fieldIndex}.options.${optionIndex}`,
  });

  const {
    attributes,
    listeners,
    transition,
    transform,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({
    id: sortableId,
    data: { optionIndex, value },
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
      style={style}
    >
      <IconButton
        {...attributes}
        {...listeners}
        ref={setActivatorNodeRef}
        size="small"
        color="inherit"
        aria-label="Sort Option (Drag / Drop)"
      >
        <SortIcon fontSize="small" />
      </IconButton>

      <TextField
        {...params}
        required
        fullWidth
        size="small"
        label={`Option ${optionIndex + 1}`}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error?.message}
      />

      <IconButton
        size="small"
        color="error"
        aria-label="Remove Option"
        onClick={onRemove}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
