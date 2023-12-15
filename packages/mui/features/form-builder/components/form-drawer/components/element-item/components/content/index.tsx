"use client";

import { useState } from "react";
import { Stack, Typography, ClickAwayListener } from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form, FormElement } from "@qikform/core";

import { ControlledTextField } from "../../../../../../../../components";

export interface FormElementItemContentProps {
  element: FormElement;
}

export function FormElementItemContent({
  element,
}: FormElementItemContentProps): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex(({ id }) => id === element.id);

  const [editing, setEditing] = useState<"name" | "label" | null>(null);

  const handleDoubleClick = (field: "name" | "label") => (): void => {
    setEditing(field);
  };

  const handleBlur = (): void => {
    setEditing(null);
  };

  return (
    <ClickAwayListener onClickAway={handleBlur}>
      <Stack sx={{ width: "100%" }}>
        {editing ? (
          <>
            {editing === "label" && (
              <ControlledTextField
                name={`elements.${index}.label`}
                textFieldProps={{
                  autoComplete: "off",
                  fullWidth: true,
                  size: "small",
                  label: "Label",
                }}
              />
            )}

            {editing === "name" && (
              <ControlledTextField
                name={`elements.${index}.name`}
                textFieldProps={{
                  autoComplete: "off",
                  required: true,
                  fullWidth: true,
                  size: "small",
                  label: "Name",
                }}
              />
            )}
          </>
        ) : (
          <>
            <Typography
              variant="body2"
              onDoubleClick={handleDoubleClick("label")}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                lineClamp: 1,
                textOverflow: "ellipsis",
                overflow: "hidden",
                wordBreak: "break-word",
                ":hover": {
                  cursor: "text",
                  backgroundColor: (theme) => theme.palette.action.selected,
                },
              }}
            >
              {element.label || element.type}
            </Typography>

            <Typography
              variant="caption"
              onDoubleClick={handleDoubleClick("name")}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                lineClamp: 1,
                textOverflow: "ellipsis",
                overflow: "hidden",
                wordBreak: "break-word",
                ":hover": {
                  cursor: "text",
                  backgroundColor: (theme) => theme.palette.action.selected,
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
