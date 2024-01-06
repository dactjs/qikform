"use client";

import type { Reducer } from "react";
import { useReducer, useMemo, useContext, createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

import type { Form } from "@qikform/core";
import { FormElementType } from "@qikform/core";

import type { FormPage } from "../types";

///////////
// State //
///////////

interface FormRendererState {
  currentPage: number;
}

type FormRendererAction =
  | {
      type: "SET_CURRENT_PAGE";
      payload: number;
    }
  | {
      type: "START_NEW_SUBMISSION";
    };

const reducer: Reducer<FormRendererState, FormRendererAction> = (
  state,
  action
): FormRendererState => {
  switch (action.type) {
    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.payload,
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
  setCurrentPage: (page: number) => void;
  startNewSubmission: () => void;
}

export const FormRendererContext = createContext<FormRendererContextValue>({
  form: {} as Form,
  pages: [],
  currentPage: initialState.currentPage,
  setCurrentPage: () => undefined,
  startNewSubmission: () => undefined,
});

export interface FormRendererProviderProps {
  form: Form;
  children: React.ReactElement;
}

export function FormRendererProvider({
  form,
  children,
}: FormRendererProviderProps): React.ReactElement {
  const methods = useForm();

  const [state, dispatch] = useReducer(reducer, initialState);

  const pages = useMemo<FormPage[]>(
    () =>
      form.elements.reduce<FormPage[]>(
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
      ),
    [form]
  );

  const handleSetCurrentPage = (page: number): void => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  const handleStartNewSubmission = (): void => {
    methods.reset();

    dispatch({ type: "START_NEW_SUBMISSION" });
  };

  return (
    <FormRendererContext.Provider
      value={{
        form,
        pages,
        currentPage: state.currentPage,
        setCurrentPage: handleSetCurrentPage,
        startNewSubmission: handleStartNewSubmission,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </FormRendererContext.Provider>
  );
}

export function useFormRenderer(): FormRendererContextValue {
  return useContext(FormRendererContext);
}
