import { Stack, TextField } from "@mui/material";
import {
  DragHandle as SortIcon,
  RemoveCircle as DeleteIcon,
} from "@mui/icons-material";

export interface MultipleChoiceOptionItemOverlayProps {
  optionIndex: number;
  value: string;
}

export function MultipleChoiceOptionItemOverlay({
  optionIndex,
  value,
}: MultipleChoiceOptionItemOverlayProps): React.ReactElement {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <SortIcon fontSize="small" color="inherit" />

      <TextField
        disabled
        required
        fullWidth
        size="small"
        label={`Option ${optionIndex + 1}`}
        defaultValue={value}
      />

      <DeleteIcon fontSize="small" color="error" />
    </Stack>
  );
}
