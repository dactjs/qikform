"use client";

import { Stack, Button, CircularProgress } from "@mui/material";

import { useFormRenderer } from "../../context";

export function Pagination(): React.ReactElement {
  const { form, pages, currentPage, setCurrentPage } = useFormRenderer();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pages.length;
  const progress = Math.abs((currentPage / pages.length) * 100);

  const previousBreaker =
    pages.find((page) => page.number === currentPage - 1)?.breaker || null;

  const currentBreaker =
    pages.find((page) => page.number === currentPage)?.breaker || null;

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
      // TODO: add media query to change direction to column
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      sx={{
        paddingTop: 1,
        borderTop: (theme) => `1px dashed ${theme.palette.divider}`,
      }}
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
    </Stack>
  );
}
