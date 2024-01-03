"use client";

import { useState } from "react";
import type { DialogProps } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { AddCircle as AddIcon } from "@mui/icons-material";
import type { Active, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useFormContext, useFieldArray } from "react-hook-form";

import type { Form, MultipleChoiceField } from "@qikform/core";

import { NoData } from "../../../../../../../../../components";

import { MultipleChoiceOptionItem } from "../option-item";
import { MultipleChoiceOptionItemOverlay } from "../option-item-overlay";

export interface MultipleChoiceOptionsDialogProps extends DialogProps {
  field: MultipleChoiceField;
}

export function MultipleChoiceOptionsDialog({
  field,
  ...dialogProps
}: MultipleChoiceOptionsDialogProps): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex((element) => element.id === field.id);

  const {
    fields: options,
    append,
    remove,
    move,
  } = useFieldArray({ name: `elements.${index}.options` });

  const handleAddOption = (): void => {
    append("");
  };

  const handleRemoveOption = (optionIndex: number) => () => {
    remove(optionIndex);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [active, setActive] = useState<Active | null>(null);

  const handleDragStart = (event: DragStartEvent): void => {
    setActive(event.active);
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    if (!event.over) return;

    const oldIndex = Number(event.active.data.current?.optionIndex);
    const newIndex = Number(event.over.data.current?.optionIndex);

    if (oldIndex !== newIndex) move(oldIndex, newIndex);

    setActive(null);
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="h6">{field.label}</Typography>

          <IconButton
            color="inherit"
            aria-label="Add New Option"
            onClick={handleAddOption}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider flexItem />

      <DialogContent
        sx={{
          maxHeight: 300,
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {options.length > 0 ? (
          <Stack component="ul" spacing={2} sx={{ padding: 0 }}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={options.map((option) => option.id)}
                strategy={verticalListSortingStrategy}
              >
                {options.map((option, optionIndex) => (
                  <MultipleChoiceOptionItem
                    key={option.id}
                    fieldIndex={index}
                    optionIndex={optionIndex}
                    sortableId={option.id}
                    onRemove={handleRemoveOption(optionIndex)}
                  />
                ))}

                <DragOverlay>
                  {Boolean(active) && (
                    <MultipleChoiceOptionItemOverlay
                      optionIndex={Number(active?.data.current?.optionIndex)}
                      value={String(active?.data.current?.value)}
                    />
                  )}
                </DragOverlay>
              </SortableContext>
            </DndContext>
          </Stack>
        ) : (
          <NoData message="At least one option is required" />
        )}
      </DialogContent>
    </Dialog>
  );
}
