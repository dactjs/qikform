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

import { useFormBuilder } from "../../../../context";

import { useHeader } from "./hooks";

export function Header(): React.ReactElement {
  const { selectedElement } = useFormBuilder();

  const {
    duplicateSelectedElement,
    deleteSelectedElement,
    closeElementDrawer,
  } = useHeader();

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
          onClick={closeElementDrawer}
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
          onClick={duplicateSelectedElement}
        >
          Duplicate
        </Button>

        <Button
          variant="outlined"
          size="small"
          endIcon={<DeleteIcon color="error" />}
          aria-label="Delete Element"
          onClick={deleteSelectedElement}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
}
