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
import { useWatch, useFieldArray } from "react-hook-form";

import type { Form } from "@qikform/core";

import { useFormBuilder } from "../../../../context";

export function Header(): React.ReactElement {
  const { selectedElement, selectElement, unselectElement } = useFormBuilder();

  const { elements } = useWatch<Form>();

  const { insert, remove } = useFieldArray<Form>({ name: "elements" });

  const handleClose = (): void => {
    unselectElement();
  };

  const handleDuplicate = (): void => {
    if (!selectedElement || !elements) return;

    const index = elements.findIndex(({ id }) => id === selectedElement.id);

    const clone = globalThis.structuredClone(selectedElement);

    clone.id = globalThis.crypto.randomUUID();
    clone.name = `${clone.name}_copy`;

    insert(index + 1, clone);

    selectElement(clone);
  };

  const handleDelete = (): void => {
    if (!selectedElement || !elements) return;

    const index = elements.findIndex(({ id }) => id === selectedElement.id);

    remove(index);

    unselectElement();
  };

  return (
    <Stack
      component={Paper}
      spacing={1}
      divider={<Divider flexItem />}
      sx={{
        position: "sticky",
        top: 0,
        padding: 1,
        zIndex: (theme) => theme.zIndex.appBar,
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
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            lineClamp: 3,
            textOverflow: "ellipsis",
            overflow: "hidden",
            wordBreak: "break-word",
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
          onClick={handleDuplicate}
        >
          Duplicate
        </Button>

        <Button
          variant="outlined"
          size="small"
          endIcon={<DeleteIcon color="error" />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
}
