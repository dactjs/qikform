"use client";

import {
  Paper,
  Stack,
  Divider,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  ContentCopy as DuplicateIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useFieldArray } from "react-hook-form";

import type { Form } from "@qikform/core";

import { useFormBuilder } from "../../../../context";

export function Header(): React.ReactElement {
  const { insert, remove } = useFieldArray<Form>({ name: "elements" });

  const { elementIndexById, selectedElement, selectElement, unselectElement } =
    useFormBuilder();

  const handleDuplicate = (): void => {
    if (!selectedElement) return;

    const index = elementIndexById[selectedElement.id];

    const clone = globalThis.structuredClone(selectedElement);

    clone.id = globalThis.crypto.randomUUID();
    clone.name = `${clone.name}_copy`;

    insert(index + 1, clone);

    selectElement(clone);
  };

  const handleDelete = (): void => {
    if (!selectedElement) return;

    const index = elementIndexById[selectedElement.id];

    remove(index);

    unselectElement();
  };

  const handleClose = (): void => {
    unselectElement();
  };

  return (
    <Stack
      component={Paper}
      spacing={1}
      divider={<Divider flexItem />}
      sx={{
        position: { md: "sticky" },
        top: 0,
        padding: 1,
        zIndex: { md: "drawer" },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          color="inherit"
          aria-label="Close Element Drawer"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {`Configure "${selectedElement?.name}"`}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Button
          variant="outlined"
          size="small"
          endIcon={<DuplicateIcon />}
          aria-label="Duplicate Element"
          onClick={handleDuplicate}
        >
          Duplicate
        </Button>

        <Button
          variant="outlined"
          size="small"
          endIcon={<DeleteIcon color="error" />}
          aria-label="Delete Element"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
}
