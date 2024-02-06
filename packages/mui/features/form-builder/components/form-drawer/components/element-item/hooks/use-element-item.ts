import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { Form, FormElement } from "@qikform/core";

import { useFormBuilder } from "../../../../../context";

export interface UseElementItemReturn {
  hasError: boolean;
  hovering: boolean;
  onHover: () => void;
  onBlur: () => void;
}

export function useElementItem(element: FormElement): UseElementItemReturn {
  const {
    formState: { errors },
  } = useFormContext<Form>();

  const { elementIndexById } = useFormBuilder();

  const index = elementIndexById[element.id];

  const hasError = Boolean(errors.elements?.[index]);

  const [hovering, setHovering] = useState<boolean>(false);

  const handleOnHover = (): void => {
    setHovering(true);
  };

  const handleOnBlur = (): void => {
    setHovering(false);
  };

  return {
    hasError,
    hovering,
    onHover: handleOnHover,
    onBlur: handleOnBlur,
  };
}
