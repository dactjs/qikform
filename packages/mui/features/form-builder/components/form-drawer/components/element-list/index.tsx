"use client";

import { Stack, Divider, List, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
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

import { NoData } from "@/components";

import {
  ElementItem,
  ElementItemOverlay,
  AddElementButton,
} from "./components";

import { useElementList } from "./hooks";

export function ElementList(): React.ReactElement {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const {
    search,
    filteredElements,
    searchElements,
    active,
    startDrag,
    endDrag,
  } = useElementList();

  return (
    <Stack spacing={1} divider={<Divider flexItem />}>
      <TextField
        autoComplete="off"
        size="small"
        placeholder="Search element..."
        value={search}
        onChange={searchElements}
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
            onDragStart={startDrag}
            onDragEnd={endDrag}
          >
            <SortableContext
              items={filteredElements.map((element) => element.id)}
              strategy={verticalListSortingStrategy}
            >
              {filteredElements.map((element) => (
                <ElementItem
                  key={element.id}
                  filtering={Boolean(search)}
                  element={element}
                />
              ))}

              <DragOverlay>
                {Boolean(active) && (
                  <ElementItemOverlay
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
        <NoData
          message="No elements found"
          sx={{ paddingTop: 3, paddingBottom: 2 }}
        />
      )}

      <AddElementButton />
    </Stack>
  );
}
