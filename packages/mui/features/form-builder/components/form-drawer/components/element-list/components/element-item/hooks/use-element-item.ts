import { useState } from "react";
import { useFormContext } from "react-hook-form";

import type { Form, FormElement } from "@qikform/core";

import { useFormBuilder } from "../../../../../../../context";

export interface UseElementItemReturn {
  hasError: boolean;
  isHovering: boolean;
  showActions: () => void;
  hideActions: () => void;
}

export function useElementItem(element: FormElement): UseElementItemReturn {
  const {
    formState: { errors },
  } = useFormContext<Form>();

  const { elementIndexById } = useFormBuilder();

  const index = elementIndexById[element.id];

  const hasError = Boolean(errors.elements?.[index]);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleShowActions = (): void => {
    setIsHovering(true);
  };

  const handleHideActions = (): void => {
    setIsHovering(false);
  };

  return {
    hasError,
    isHovering,
    showActions: handleShowActions,
    hideActions: handleHideActions,
  };
}
