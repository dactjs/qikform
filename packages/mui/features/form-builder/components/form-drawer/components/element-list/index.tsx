"use client";

import { useState, useMemo } from "react";
import { Stack, Divider, List, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
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

import type { Form } from "@qikform/core";

import { NoData } from "../../../../../../components";

import { FormElementItem } from "../element-item";
import { FormElementItemOverlay } from "../element-item-overlay";
import { AddElementButton } from "../add-element-button";

export function FormElementList(): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const { move } = useFieldArray<Form>({ name: "elements" });

  const [search, setSearch] = useState("");

  const elements = watch("elements");

  const filteredElements = useMemo(
    () =>
      elements.filter(
        (element) =>
          element.name.toLowerCase().includes(search.toLowerCase()) ||
          element.label?.toLowerCase().includes(search.toLowerCase())
      ),
    [elements, search]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
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

    const oldIndex = Number(event.active.data.current?.elementIndex);
    const newIndex = Number(event.over.data.current?.elementIndex);

    if (oldIndex !== newIndex) move(oldIndex, newIndex);

    setActive(null);
  };

  return (
    <Stack spacing={1} divider={<Divider flexItem />}>
      <TextField
        autoComplete="off"
        size="small"
        placeholder="Search element..."
        value={search}
        onChange={handleChange}
        InputProps={{ endAdornment: <SearchIcon /> }}
      />

      {filteredElements.length > 0 ? (
        <List
          dense
          disablePadding
          sx={{ maxHeight: 350, overflowX: "hidden", overflowY: "auto" }}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={elements.map((element) => element.id)}
              strategy={verticalListSortingStrategy}
            >
              {filteredElements.map((element) => (
                <FormElementItem
                  key={element.id}
                  filtering={Boolean(search)}
                  element={element}
                />
              ))}

              <DragOverlay>
                {Boolean(active) && (
                  <FormElementItemOverlay
                    type={String(active?.data.current?.type)}
                    name={String(active?.data.current?.name)}
                    label={active?.data.current?.label as string}
                  />
                )}
              </DragOverlay>
            </SortableContext>
          </DndContext>
        </List>
      ) : (
        <NoData message="No elements found" />
      )}

      <AddElementButton />
    </Stack>
  );
}
