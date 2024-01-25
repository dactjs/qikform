import type { FileURLBuildStrategy } from "../../types";

export const objectURLFileURLBuildStrategy: FileURLBuildStrategy = (file) => {
  const url = URL.createObjectURL(file);

  return Promise.resolve(url);
};
