import { useState } from "react";

export interface UseFormDrawerElementItemContentReturn {
  editing: "name" | "label" | null;
  onDoubleClick: (field: "name" | "label") => () => void;
  onBlur: () => void;
}

export function useFormDrawerElementItemContent(): UseFormDrawerElementItemContentReturn {
  const [editing, setEditing] = useState<"name" | "label" | null>(null);

  const handleOnDoubleClick = (field: "name" | "label") => (): void => {
    setEditing(field);
  };

  const handleOnBlur = (): void => {
    setEditing(null);
  };

  return {
    editing,
    onDoubleClick: handleOnDoubleClick,
    onBlur: handleOnBlur,
  };
}
