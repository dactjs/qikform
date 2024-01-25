"use client";

import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  InfoOutlined as InfoIcon,
  AccountTree as ElementsIcon,
  Palette as CustomizationIcon,
} from "@mui/icons-material";
import { useFormContext } from "react-hook-form";

import type { Form } from "@qikform/core";

import { FormDrawerInformation } from "./information";
import { FormDrawerElementList } from "./element-list";
import { FormDrawerCustomization } from "./customization";

export function FormDrawer(): React.ReactElement {
  const {
    formState: { errors },
  } = useFormContext<Form>();

  const hasInformationError = Boolean(errors.title || errors.description);
  const hasElementsError = Boolean(errors.elements);
  const hasCustomizationError = Boolean(errors.customization);

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          id="form-drawer-information-panel-header"
          aria-controls="form-drawer-information-panel-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ ...(hasInformationError && { color: "error.main" }) }}
          >
            <InfoIcon />
            <Typography>Information</Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <FormDrawerInformation />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          id="form-drawer-element-list-panel-header"
          aria-controls="form-drawer-element-list-panel-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ ...(hasElementsError && { color: "error.main" }) }}
          >
            <ElementsIcon />
            <Typography>Elements</Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <FormDrawerElementList />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          id="form-drawer-customization-panel-header"
          aria-controls="form-drawer-customization-panel-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ ...(hasCustomizationError && { color: "error.main" }) }}
          >
            <CustomizationIcon />
            <Typography>Customization</Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <FormDrawerCustomization />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
