import { Stack, Typography } from "@mui/material";
import {
  DragHandle as SortIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

export interface FormDrawerElementItemOverlayProps {
  type: string;
  name: string;
  label: string | null;
}

export function FormDrawerElementItemOverlay({
  type,
  name,
  label,
}: FormDrawerElementItemOverlayProps): React.ReactElement {
  return (
    <Stack
      component="li"
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ paddingX: 1.5, paddingY: 1 }}
    >
      <SortIcon fontSize="small" />

      <Stack sx={{ width: "100%" }}>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {label || type}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {name}
        </Typography>
      </Stack>

      <SettingsIcon fontSize="small" />
    </Stack>
  );
}
