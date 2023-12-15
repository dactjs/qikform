"use client";

import { useState } from "react";
import { Stack, IconButton, ClickAwayListener } from "@mui/material";
import {
  DragHandle as SwapIcon,
  ArrowDropUp as ArrowUpIcon,
  ArrowDropDown as ArrowDownIcon,
} from "@mui/icons-material";
import { useFormContext, useFieldArray } from "react-hook-form";

import type { Form, FormElement } from "@qikform/core";

export interface FormElementItemSwapperProps {
  element: FormElement;
}

export function FormElementItemSwapper({
  element,
}: FormElementItemSwapperProps): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const { move } = useFieldArray<Form>({ name: "elements" });

  const elements = watch("elements");

  const index = elements.findIndex(({ id }) => id === element.id);

  const isFirst = index === 0;

  const isLast = index === elements.length - 1;

  const handleMoveElementUp = (): void => {
    move(index, index - 1);
  };

  const handleMoveElementDown = (): void => {
    move(index, index + 1);
  };

  const [swapping, setSwapping] = useState(false);

  const handleClick = (): void => {
    setSwapping(true);
  };

  const handleBlur = (): void => {
    setSwapping(false);
  };

  return (
    <ClickAwayListener onClickAway={handleBlur}>
      <Stack direction="row" justifyContent="flex-start" alignItems="center">
        {swapping ? (
          <>
            <IconButton
              size="small"
              color="inherit"
              aria-label="Move Element Up"
              disabled={isFirst}
              onClick={handleMoveElementUp}
            >
              <ArrowUpIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              color="inherit"
              aria-label="Move Element Down"
              disabled={isLast}
              onClick={handleMoveElementDown}
            >
              <ArrowDownIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <IconButton
            size="small"
            color="inherit"
            aria-label="Swap Element"
            disabled={elements.length === 1}
            onClick={handleClick}
          >
            <SwapIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
    </ClickAwayListener>
  );
}
