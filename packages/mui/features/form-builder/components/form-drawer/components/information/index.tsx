import { Stack } from "@mui/material";

import { ControlledTextField } from "../../../../../../components";

export function FormInformation(): React.ReactElement {
  return (
    <Stack spacing={2}>
      <ControlledTextField
        name="title"
        textFieldProps={{
          autoComplete: "off",
          required: true,
          fullWidth: true,
          size: "small",
          label: "Title",
        }}
      />

      <ControlledTextField
        name="description"
        textFieldProps={{
          autoComplete: "off",
          multiline: true,
          fullWidth: true,
          label: "Description",
        }}
      />
    </Stack>
  );
}
