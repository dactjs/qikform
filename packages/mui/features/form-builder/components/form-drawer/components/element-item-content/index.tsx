"use client";

import { Stack, Typography, ClickAwayListener } from "@mui/material";

import type { FormElement } from "@qikform/core";

import { ControlledTextField } from "@/components";

import { useFormBuilder } from "../../../../context";

import { useElementItemContent } from "./hooks";

export interface ElementItemContentProps {
  element: FormElement;
}

export function ElementItemContent({
  element,
}: ElementItemContentProps): React.ReactElement {
  const { elementIndexById } = useFormBuilder();

  const { editingProperty, startEditing, endEditing } = useElementItemContent();

  const index = elementIndexById[element.id];

  return (
    <ClickAwayListener onClickAway={endEditing}>
      <Stack
        sx={[{ width: "100%" }, !editingProperty && { overflowX: "hidden" }]}
      >
        {editingProperty ? (
          <>
            {editingProperty === "label" && (
              <ControlledTextField
                name={`elements.${index}.label`}
                autoComplete="off"
                fullWidth
                size="small"
                label="Label"
              />
            )}

            {editingProperty === "name" && (
              <ControlledTextField
                name={`elements.${index}.name`}
                autoComplete="off"
                required
                fullWidth
                size="small"
                label="Name"
              />
            )}
          </>
        ) : (
          <>
            <Typography
              variant="body2"
              onDoubleClick={startEditing("label")}
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",

                ":hover": {
                  cursor: "text",
                  backgroundColor: "action.selected",
                },
              }}
            >
              {element.label || element.type}
            </Typography>

            <Typography
              variant="caption"
              onDoubleClick={startEditing("name")}
              sx={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",

                ":hover": {
                  cursor: "text",
                  backgroundColor: "action.selected",
                },
              }}
            >
              {element.name}
            </Typography>
          </>
        )}
      </Stack>
    </ClickAwayListener>
  );
}
