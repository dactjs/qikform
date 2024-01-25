import type { FileURLBuildStrategy } from "../../types";

export const base64FileURLBuildStrategy: FileURLBuildStrategy = (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(String(reader.result));
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
};
