"use client";

import { Stack, Typography, ClickAwayListener } from "@mui/material";

import type { FormElement } from "@qikform/core";

import { ControlledTextField } from "@/components";

import { useFormBuilder } from "../../../../../context";

import { useFormDrawerElementItemContent } from "./hooks";

export interface ElementItemContentProps {
  element: FormElement;
}

export function ElementItemContent({
  element,
}: ElementItemContentProps): React.ReactElement {
  const { elementIndexById } = useFormBuilder();

  const { editing, onDoubleClick, onBlur } = useFormDrawerElementItemContent();

  const index = elementIndexById[element.id];

  return (
    <ClickAwayListener onClickAway={onBlur}>
      <Stack sx={[{ width: "100%" }, !editing && { overflowX: "hidden" }]}>
        {editing ? (
          <>
            {editing === "label" && (
              <ControlledTextField
                name={`elements.${index}.label`}
                autoComplete="off"
                fullWidth
                size="small"
                label="Label"
              />
            )}

            {editing === "name" && (
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
              onDoubleClick={onDoubleClick("label")}
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
              onDoubleClick={onDoubleClick("name")}
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
