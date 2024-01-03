import { Stack, Typography } from "@mui/material";
import {
  DragHandle as SortIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

export interface FormElementItemOverlayProps {
  type: string;
  name: string;
  label: string | null;
}

export function FormElementItemOverlay({
  type,
  name,
  label,
}: FormElementItemOverlayProps): React.ReactElement {
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
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            lineClamp: 1,
            textOverflow: "ellipsis",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {label || type}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            lineClamp: 1,
            textOverflow: "ellipsis",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {name}
        </Typography>
      </Stack>

      <SettingsIcon fontSize="small" />
    </Stack>
  );
}
