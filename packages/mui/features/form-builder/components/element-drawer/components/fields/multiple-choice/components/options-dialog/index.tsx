"use client";

import type { DialogProps } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { AddCircle as AddIcon } from "@mui/icons-material";
import { useFormContext, useFieldArray } from "react-hook-form";

import type { Form, MultipleChoiceField } from "@qikform/core";

import { NoData } from "../../../../../../../../../components";

import { MultipleChoiceOptionItem } from "../option-item";

export interface MultipleChoiceOptionsDialogProps extends DialogProps {
  field: MultipleChoiceField;
}

export function MultipleChoiceOptionsDialog({
  field,
  ...dialogProps
}: MultipleChoiceOptionsDialogProps): React.ReactElement {
  const { watch } = useFormContext<Form>();

  const elements = watch("elements");

  const index = elements.findIndex((element) => element.id === field.id);

  const {
    fields: options,
    append,
    remove,
    move,
  } = useFieldArray({
    name: `elements.${index}.options`,
  });

  const handleAddOption = (): void => {
    append("");
  };

  const handleMoveOptionUp = (optionIndex: number) => () => {
    move(optionIndex, optionIndex - 1);
  };

  const handleMoveOptionDown = (optionIndex: number) => () => {
    move(optionIndex, optionIndex + 1);
  };

  const handleRemoveOption = (optionIndex: number) => () => {
    remove(optionIndex);
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
          <Typography variant="h6">{field.label}</Typography>

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

      <DialogContent sx={{ maxHeight: 300, paddingX: 1 }}>
        {options.length > 0 ? (
          <Stack component="ul" spacing={2}>
            {options.map((option, optionIndex) => {
              const isFirst = optionIndex === 0;

              const isLast = optionIndex === options.length - 1;

              return (
                <MultipleChoiceOptionItem
                  key={option.id}
                  fieldIndex={index}
                  optionIndex={optionIndex}
                  isFirst={isFirst}
                  isLast={isLast}
                  onMoveUp={handleMoveOptionUp(optionIndex)}
                  onMoveDown={handleMoveOptionDown(optionIndex)}
                  onRemove={handleRemoveOption(optionIndex)}
                />
              );
            })}
          </Stack>
        ) : (
          <NoData message="At least one option is required" />
        )}
      </DialogContent>
    </Dialog>
  );
}
