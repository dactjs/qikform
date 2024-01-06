"use client";

import { useMemo } from "react";
import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import { useFormContext } from "react-hook-form";

import type { PageBreakBlock } from "@qikform/core";

import { useFormRenderer } from "../../context";

export function Pagination(): React.ReactElement {
  const {
    formState: { errors },
  } = useFormContext();

  const { form, pages, currentPage, setCurrentPage } = useFormRenderer();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages.length;
  const progress = Math.abs((currentPage / pages.length) * 100);

  const previousBreaker = useMemo<PageBreakBlock | null>(() => {
    const page = pages.find(({ number }) => number === currentPage - 1);

    return page?.breaker || null;
  }, [pages, currentPage]);

  const currentBreaker = useMemo<PageBreakBlock | null>(() => {
    const page = pages.find(({ number }) => number === currentPage);

    return page?.breaker || null;
  }, [pages, currentPage]);

  const hiddenElementNames = useMemo<string[]>(() => {
    const hiddenPages = pages.filter(({ number }) => number !== currentPage);

    const names = hiddenPages.flatMap(({ elements }) =>
      elements.map((element) => element.name)
    );

    return names;
  }, [pages, currentPage]);

  const hasHiddenErrors = useMemo<boolean>(() => {
    const keys = Object.keys(errors);

    return keys.some((key) => hiddenElementNames.includes(key));
  }, [errors, hiddenElementNames]);

  const handlePreviousPage = (): void => {
    if (isFirstPage) return;

    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = (): void => {
    if (isLastPage) return;

    setCurrentPage(currentPage + 1);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        paddingTop: 1,
        borderTopWidth: 1,
        borderTopStyle: "dashed",
        borderTopColor: "divider",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ overflowX: "auto" }}
      >
        <Stack direction="row" spacing={1}>
          {!isFirstPage && (
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handlePreviousPage}
            >
              {previousBreaker?.previousPageButtonText || "Previous"}
            </Button>
          )}

          {!isLastPage && (
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleNextPage}
            >
              {currentBreaker?.nextPageButtonText || "Next"}
            </Button>
          )}

          {Boolean(isLastPage) && (
            <Button
              type="submit"
              variant="contained"
              size="small"
              color="warning"
            >
              {form.customization.submitButtonText}
            </Button>
          )}
        </Stack>

        {pages.length > 1 && (
          <Stack sx={{ position: "relative" }}>
            <CircularProgress
              variant="determinate"
              size={25}
              thickness={6}
              color="inherit"
              value={100}
              sx={{ position: "absolute" }}
            />

            <CircularProgress
              variant="determinate"
              size={25}
              thickness={6}
              color="info"
              value={progress}
            />
          </Stack>
        )}
      </Stack>

      {Boolean(hasHiddenErrors) && (
        <Typography variant="caption" color="error">
          There are errors on other pages. Please fix them before submitting.
        </Typography>
      )}
    </Stack>
  );
}
