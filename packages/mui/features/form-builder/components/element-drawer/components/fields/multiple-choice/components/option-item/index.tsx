"use client";

import { Stack, TextField, IconButton } from "@mui/material";
import {
  ArrowDropUp as ArrowUpIcon,
  ArrowDropDown as ArrowDownIcon,
  RemoveCircle as DeleteIcon,
} from "@mui/icons-material";
import { useController } from "react-hook-form";

import type { Form } from "@qikform/core";

export interface MultipleChoiceOptionItemProps {
  fieldIndex: number;
  optionIndex: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

export function MultipleChoiceOptionItem({
  fieldIndex,
  optionIndex,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
}: MultipleChoiceOptionItemProps): React.ReactElement {
  const {
    field: { value, onChange, ...params },
    fieldState: { error },
  } = useController<Form>({
    name: `elements.${fieldIndex}.options.${optionIndex}`,
  });

  return (
    <Stack component="li" direction="row" alignItems="center" spacing={1}>
      <Stack direction="row" spacing={0.25}>
        <IconButton
          size="small"
          color="inherit"
          aria-label="Move Option Up"
          disabled={isFirst}
          onClick={onMoveUp}
        >
          <ArrowUpIcon fontSize="small" />
        </IconButton>

        <IconButton
          size="small"
          color="inherit"
          aria-label="Move Option Down"
          disabled={isLast}
          onClick={onMoveDown}
        >
          <ArrowDownIcon fontSize="small" />
        </IconButton>
      </Stack>

      <TextField
        {...params}
        required
        fullWidth
        size="small"
        label={`Option ${optionIndex + 1}`}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error?.message}
      />

      <IconButton
        size="small"
        color="error"
        aria-label="Remove Option"
        onClick={onRemove}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
