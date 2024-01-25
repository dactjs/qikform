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
  Alert,
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

import type { URLField } from "@qikform/core";

import { NoData } from "../../../../../../../../components";

import { useFormBuilder } from "../../../../../../context";

import { URLAllowedDomainItem } from "../allowed-domain-item";
import { URLAllowedDomainItemOverlay } from "../allowed-domain-item-overlay";

export interface URLAllowedDomainsDialogProps extends DialogProps {
  field: URLField;
}

export function URLAllowedDomainsDialog({
  field,
  ...dialogProps
}: URLAllowedDomainsDialogProps): React.ReactElement {
  const { elementIndexById } = useFormBuilder();

  const index = elementIndexById[field.id];

  const {
    fields: options,
    append,
    remove,
    move,
  } = useFieldArray({ name: `elements.${index}.rules.allowedDomains` });

  const handleAddOption = (): void => {
    append("");
  };

  const handleRemoveOption = (domainIndex: number) => () => {
    remove(domainIndex);
  };

  /////////////////
  // Drag & Drop //
  /////////////////

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [active, setActive] = useState<Active | null>(null);

  const handleOnDragStart = (event: DragStartEvent): void => {
    setActive(event.active);
  };

  const handleOnDragEnd = (event: DragEndEvent): void => {
    if (!event.over) return;

    const oldIndex = Number(event.active.data.current?.domainIndex);
    const newIndex = Number(event.over.data.current?.domainIndex);

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
          <Typography variant="h6">{`Allowed Domains (${field.label})`}</Typography>

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

      <DialogContent sx={{ position: "relative", padding: 0 }}>
        <Alert severity="info">
          If no domains are specified, all domains will be allowed.
        </Alert>

        {options.length > 0 ? (
          <Stack
            component="ul"
            spacing={2}
            sx={{ maxHeight: 300, padding: 2, overflow: "auto" }}
          >
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
                {options.map((option, domainIndex) => (
                  <URLAllowedDomainItem
                    key={option.id}
                    fieldIndex={index}
                    domainIndex={domainIndex}
                    sortableId={option.id}
                    onRemove={handleRemoveOption(domainIndex)}
                  />
                ))}

                <DragOverlay>
                  {Boolean(active) && (
                    <URLAllowedDomainItemOverlay
                      domainIndex={Number(active?.data.current?.domainIndex)}
                      value={String(active?.data.current?.value)}
                    />
                  )}
                </DragOverlay>
              </SortableContext>
            </DndContext>
          </Stack>
        ) : (
          <NoData
            message="No domain restrictions. Add domains to control which domains are allowed."
            sx={{ padding: 4 }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
