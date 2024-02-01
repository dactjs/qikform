"use client";

import { useState } from "react";
import { InputAdornment } from "@mui/material";
import { Image as ImageIcon, Cancel as DeleteIcon } from "@mui/icons-material";
import { MuiFileInput } from "mui-file-input";
import { useSnackbar } from "notistack";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";

import type { Form } from "@qikform/core";

import { useFormBuilder } from "../../../../../../context";

export interface ControlledUploadImageInputProps {
  name: FieldPath<Form>;
}

export function ControlledUploadImageInput({
  name,
}: ControlledUploadImageInputProps): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  const {
    field: { value: state, onChange, ...params },
    fieldState: { error },
  } = useController<Form>({ name });

  const { fileURLBuildStrategy } = useFormBuilder();

  const [file, setFile] = useState<File | null>(() => {
    if (typeof state !== "string") return null;

    return new File(["uploaded"], "uploaded.img");
  });

  const handleOnChange = (upload: File | null): void => {
    if (!upload) return;

    fileURLBuildStrategy(upload)
      .then((url) => {
        onChange(url);
        setFile(upload);
      })
      .catch(() => {
        enqueueSnackbar("Failed to upload image", { variant: "error" });
      });
  };

  return (
    <MuiFileInput
      {...params}
      required
      hideSizeText
      label="Image"
      placeholder="Upload Image"
      value={file}
      onChange={handleOnChange}
      error={Boolean(error)}
      helperText={error?.message}
      inputProps={{ accept: "image/*" }}
      clearIconButtonProps={{
        title: "Remove",
        children: <DeleteIcon fontSize="small" />,
      }}
      InputProps={{
        sx: { overflowX: "hidden", textOverflow: "ellipsis" },
        startAdornment: (
          <InputAdornment position="start">
            <ImageIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
