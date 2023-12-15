"use client";

import { useState } from "react";
import { Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { Form, FormElement } from "@qikform/core";

import {
  FormElementItemSwapper,
  FormElementItemContent,
  FormElementItemActions,
} from "./components";

export interface FormElementItemProps {
  filtering: boolean;
  element: FormElement;
}

export function FormElementItem({
  filtering,
  element,
}: FormElementItemProps): React.ReactElement {
  const {
    formState: { errors },
    watch,
  } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex(({ id }) => id === element.id);

  const isElementError = Boolean(errors.elements?.[index]);

  const [hovering, setHovering] = useState(false);

  const handleHover = (): void => {
    setHovering(true);
  };

  const handleBlur = (): void => {
    setHovering(false);
  };

  return (
    <Stack
      component="li"
      direction="row"
      alignItems="center"
      spacing={1}
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      sx={{
        padding: (theme) => theme.spacing(1, 0.5),
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        ":last-of-type": { borderBottom: "none" },
        ...(isElementError && { color: "error.main" }),
      }}
    >
      {Boolean(filtering) && <FormElementItemSwapper element={element} />}
      <FormElementItemContent element={element} />
      <FormElementItemActions show={hovering} element={element} />
    </Stack>
  );
}
