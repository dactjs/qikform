import type { FileURLBuildStrategy } from "../../types";

export const base64FileURLBuildStrategy: FileURLBuildStrategy = (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result);
    };

    reader.onerror = () => {
      const error = new Error(reader.error?.message || "Error reading file");
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
