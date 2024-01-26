import {
  Stack,
  Divider,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  Switch,
} from "@mui/material";
import { Controller } from "react-hook-form";

import {
  ControlledTextField,
  ControlledRichEditor,
} from "../../../../../components";

export function FormDrawerCustomization(): React.ReactElement {
  return (
    <Stack spacing={2} divider={<Divider flexItem />}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Form</FormLabel>

        <FormGroup>
          <Controller
            name="customization.hideTitle"
            render={({ field, fieldState: { error } }) => (
              <FormControl error={Boolean(error)}>
                <FormControlLabel
                  label="Hide Title"
                  control={<Switch {...field} checked={Boolean(field.value)} />}
                />

                {Boolean(error) && (
                  <FormHelperText>{error?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="customization.hideDescription"
            render={({ field, fieldState: { error } }) => (
              <FormControl error={Boolean(error)}>
                <FormControlLabel
                  label="Hide Description"
                  control={<Switch {...field} checked={Boolean(field.value)} />}
                />

                {Boolean(error) && (
                  <FormHelperText>{error?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="customization.disablePadding"
            render={({ field, fieldState: { error } }) => (
              <FormControl error={Boolean(error)}>
                <FormControlLabel
                  label="Disable Padding"
                  control={<Switch {...field} checked={Boolean(field.value)} />}
                />

                {Boolean(error) && (
                  <FormHelperText>{error?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="customization.transparentBackground"
            render={({ field, fieldState: { error } }) => (
              <FormControl error={Boolean(error)}>
                <FormControlLabel
                  label="Transparent Background"
                  control={<Switch {...field} checked={Boolean(field.value)} />}
                />

                {Boolean(error) && (
                  <FormHelperText>{error?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </FormGroup>

        <FormHelperText>Useful when embedding your form</FormHelperText>
      </FormControl>

      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">Submissions</FormLabel>

        <Stack spacing={2}>
          <Controller
            name="customization.allowMultipleSubmissions"
            render={({ field, fieldState: { error } }) => (
              <FormControl error={Boolean(error)}>
                <FormControlLabel
                  label="Allow Multiple Submissions"
                  control={<Switch {...field} checked={Boolean(field.value)} />}
                />

                {Boolean(error) && (
                  <FormHelperText>{error?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <ControlledTextField
            name="customization.fillAgainButtonText"
            autoComplete="off"
            required
            fullWidth
            size="small"
            label="Fill Again Button Text"
          />

          <ControlledTextField
            name="customization.submitButtonText"
            autoComplete="off"
            required
            fullWidth
            size="small"
            label="Submit Button Text"
          />

          <ControlledRichEditor
            name="customization.submissionText"
            required
            label="Submission Text"
          />
        </Stack>
      </FormControl>
    </Stack>
  );
}
