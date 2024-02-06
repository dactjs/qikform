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
import { useFieldArray } from "react-hook-form";

import type { MultipleChoiceField } from "@qikform/core";

import { NoData } from "@/components";

import { useFormBuilder } from "../../../../../../../context";

import { MultipleChoiceOptionItem } from "../option-item";
import { MultipleChoiceOptionItemOverlay } from "../option-item-overlay";

export interface MultipleChoiceOptionsDialogProps extends DialogProps {
  field: MultipleChoiceField;
}

export function MultipleChoiceOptionsDialog({
  field,
  ...dialogProps
}: MultipleChoiceOptionsDialogProps): React.ReactElement {
  const { elementIndexById } = useFormBuilder();

  const index = elementIndexById[field.id];

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

  /////////////////
  // Drag & Drop //
  /////////////////

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [active, setActive] = useState<Active | null>(null);

  const handleOnDragStart = (event: DragStartEvent): void => {
    setActive(event.active);
  };

  const handleOnDragEnd = (event: DragEndEvent): void => {
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
          <Typography variant="h6">{`Options (${field.label})`}</Typography>

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
              onDragStart={handleOnDragStart}
              onDragEnd={handleOnDragEnd}
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
          <NoData
            message="At least one option is required"
            sx={{
              padding: 4,
              borderRadius: 1,
              border: 1,
              borderColor: "error.main",
              outlineOffset: -2,
              outline: 1,
              outlineColor: "error.main",
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
