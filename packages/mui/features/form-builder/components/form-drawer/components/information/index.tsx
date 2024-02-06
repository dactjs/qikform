import { Stack } from "@mui/material";

import { ControlledTextField } from "@/components";

export function Information(): React.ReactElement {
  return (
    <Stack spacing={2}>
      <ControlledTextField
        name="title"
        autoComplete="off"
        required
        fullWidth
        size="small"
        label="Title"
      />

      <ControlledTextField
        name="description"
        autoComplete="off"
        multiline
        fullWidth
        label="Description"
      />
    </Stack>
  );
}
