"use client";

import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { useFormRenderer } from "../../context";

export function FormRendererPagination(): React.ReactElement {
  const {
    formState: { errors },
  } = useFormContext();

  const {
    form,
    pages,
    currentPage,
    visibleElements,
    goToPreviousPage,
    goToNextPage,
  } = useFormRenderer();

  const progress = Math.abs((currentPage / pages.length) * 100);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages.length;

  const previousBreaker = pages[currentPage - 2]?.breaker ?? null;
  const currentBreaker = pages[currentPage - 1]?.breaker ?? null;

  const hasHiddenErrors = Object.keys(errors).some((key) =>
    visibleElements.every(({ name }) => name !== key),
  );

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
              onClick={goToPreviousPage}
            >
              {previousBreaker?.previousPageButtonText || "Previous"}
            </Button>
          )}

          {!isLastPage && (
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={goToNextPage}
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
