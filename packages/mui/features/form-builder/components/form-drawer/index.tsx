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

import {
  FormInformation,
  FormElementList,
  FormCustomization,
} from "./components";

export function FormDrawer(): React.ReactElement {
  const {
    formState: { errors },
  } = useFormContext<Form>();

  const isInformationError = Boolean(errors.title || errors.description);
  const isElementsError = Boolean(errors.elements);
  const isCustomizationError = Boolean(errors.customization);

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          id="information-panel-header"
          aria-controls="information-panel-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ ...(isInformationError && { color: "error.main" }) }}
          >
            <InfoIcon />
            <Typography>Information</Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <FormInformation />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          id="elements-panel-header"
          aria-controls="elements-panel-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ ...(isElementsError && { color: "error.main" }) }}
          >
            <ElementsIcon />
            <Typography>Elements</Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <FormElementList />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          id="customization-panel-header"
          aria-controls="customization-panel-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ ...(isCustomizationError && { color: "error.main" }) }}
          >
            <CustomizationIcon />
            <Typography>Customization</Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <FormCustomization />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
