import { Stack, TextField } from "@mui/material";
import {
  DragHandle as SortIcon,
  RemoveCircle as DeleteIcon,
} from "@mui/icons-material";

export interface URLAllowedDomainItemOverlayProps {
  domainIndex: number;
  value: string;
}

export function URLAllowedDomainItemOverlay({
  domainIndex,
  value,
}: URLAllowedDomainItemOverlayProps): React.ReactElement {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <SortIcon fontSize="small" color="inherit" />

      <TextField
        disabled
        required
        fullWidth
        size="small"
        label={`Option ${domainIndex + 1}`}
        placeholder="google.com, apple.com, etc."
        defaultValue={value}
      />

      <DeleteIcon fontSize="small" color="error" />
    </Stack>
  );
}
