"use client";

import type { Reducer } from "react";
import { useReducer, useContext, createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { Form, FormElement } from "@qikform/core";
import { FormElementType } from "@qikform/core";

import type { FormRendererValues, FormPage } from "../types";

///////////
// State //
///////////

interface FormRendererState {
  currentPage: number;
}

type FormRendererAction =
  | { type: "GO_TO_PREVIOUS_PAGE" }
  | { type: "GO_TO_NEXT_PAGE" }
  | { type: "START_NEW_SUBMISSION" };

const reducer: Reducer<FormRendererState, FormRendererAction> = (
  state,
  action
): FormRendererState => {
  switch (action.type) {
    case "GO_TO_PREVIOUS_PAGE": {
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    }

    case "GO_TO_NEXT_PAGE": {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    }

    case "START_NEW_SUBMISSION": {
      return initialState;
    }
  }
};

const initialState: FormRendererState = {
  currentPage: 1,
};

/////////////
// Context //
/////////////

export interface FormRendererContextValue {
  form: Form;
  pages: FormPage[];
  currentPage: number;
  visibleElements: FormElement[];
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  startNewSubmission: () => void;
  endSubmission: () => Promise<void>;
}

export const FormRendererContext = createContext<FormRendererContextValue>({
  form: {} as Form,
  pages: [],
  currentPage: initialState.currentPage,
  visibleElements: [],
  goToPreviousPage: () => undefined,
  goToNextPage: () => undefined,
  startNewSubmission: () => undefined,
  endSubmission: () => Promise.resolve(),
});

export interface FormRendererProviderProps {
  form: Form;
  onSubmit?: (values: FormRendererValues) => void | Promise<void>;
  children: React.ReactElement;
}

export function FormRendererProvider({
  form,
  onSubmit,
  children,
}: FormRendererProviderProps): React.ReactElement {
  const methods = useForm();

  const [state, dispatch] = useReducer(reducer, initialState);

  const pages = form.elements.reduce<FormPage[]>(
    (acc, element) => {
      if (element.configuration.hidden) return acc;

      const lastPage = acc[acc.length - 1];

      if (element.type !== FormElementType.PAGE_BREAK)
        lastPage.elements.push(element);

      if (element.type === FormElementType.PAGE_BREAK) {
        lastPage.breaker = element;

        acc.push({
          number: lastPage.number + 1,
          elements: [],
          breaker: null,
        });
      }

      return acc;
    },
    [
      {
        number: 1,
        elements: [],
        breaker: null,
      },
    ]
  );

  const visibleElements = pages[state.currentPage - 1]?.elements ?? [];

  const handleGoToPreviousPage = (): void => {
    const isFirstPage = state.currentPage === 1;

    if (isFirstPage) return;

    dispatch({ type: "GO_TO_PREVIOUS_PAGE" });
  };

  const handleGoToNextPage = (): void => {
    const isLastPage = state.currentPage === pages.length;

    if (isLastPage) return;

    dispatch({ type: "GO_TO_NEXT_PAGE" });
  };

  const handleStartNewSubmission = (): void => {
    methods.reset();

    dispatch({ type: "START_NEW_SUBMISSION" });
  };

  const handleEndSubmission = methods.handleSubmit(
    async (values: FormRendererValues): Promise<void> => {
      if (!onSubmit) return;

      await onSubmit(values);
    }
  );

  return (
    <FormRendererContext.Provider
      value={{
        form,
        pages,
        currentPage: state.currentPage,
        visibleElements,
        goToPreviousPage: handleGoToPreviousPage,
        goToNextPage: handleGoToNextPage,
        startNewSubmission: handleStartNewSubmission,
        endSubmission: handleEndSubmission,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </FormRendererContext.Provider>
  );
}

export function useFormRenderer(): FormRendererContextValue {
  return useContext(FormRendererContext);
}
