"use client";

import { useState } from "react";
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Button,
  Tooltip,
  Popover,
} from "@mui/material";
import {
  AddCircle as AddIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  HorizontalRule as DividerIcon,
  ShortText as PlainTextIcon,
  WrapText as RichTextIcon,
  Numbers as NumberIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckBox as CheckboxIcon,
  AccessTime as TimeIcon,
  CalendarMonth as DateIcon,
  Event as DateTimeIcon,
} from "@mui/icons-material";
import { useFieldArray } from "react-hook-form";

import type { Form } from "@qikform/core";
import { FormElementType, FormElementSchema } from "@qikform/core";

import { useFormBuilder } from "../../../../context";

interface OptionElement {
  type: FormElementType;
  label: string;
  description: string;
  icon: React.ReactElement;
}

interface Options {
  title: string;
  elements: OptionElement[];
}

export function AddElementButton(): React.ReactElement {
  const { selectElement } = useFormBuilder();

  const { fields: elements, append } = useFieldArray<Form>({
    name: "elements",
  });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const options: Options[] = [
    {
      title: "Block Elements",
      elements: [
        {
          icon: <RichTextIcon />,
          type: FormElementType.TEXT,
          label: "Text",
          description:
            "A block of text that can be used to display information or instructions.",
        },
        {
          icon: <ImageIcon />,
          type: FormElementType.IMAGE,
          label: "Image",
          description:
            "A block for adding and displaying images within your form.",
        },
        {
          icon: <CodeIcon />,
          type: FormElementType.CODE,
          label: "Code",
          description:
            "A block of code that can be used to showcase programming code snippets.",
        },
        {
          icon: <DividerIcon />,
          type: FormElementType.DIVIDER,
          label: "Divider",
          description:
            "A horizontal line or divider used to separate content sections.",
        },
      ],
    },
    {
      title: "Field Elements",
      elements: [
        {
          icon: <PlainTextIcon />,
          type: FormElementType.PLAIN_TEXT,
          label: "Plain Text",
          description: "A simple text field for entering plain text content.",
        },
        {
          icon: <RichTextIcon />,
          type: FormElementType.RICH_TEXT,
          label: "Rich Text",
          description:
            "A rich text field that allows you to format and style your text content.",
        },
        {
          icon: <NumberIcon />,
          type: FormElementType.NUMBER,
          label: "Number",
          description:
            "A field for entering numerical values like integers or decimals.",
        },
        {
          icon: <EmailIcon />,
          type: FormElementType.EMAIL,
          label: "Email",
          description: "A field for entering email addresses.",
        },
        {
          icon: <PhoneIcon />,
          type: FormElementType.PHONE,
          label: "Phone",
          description: "A field for entering phone numbers.",
        },
        {
          icon: <CheckboxIcon />,
          type: FormElementType.CHECKBOX,
          label: "Checkbox",
          description: "A field for checking or unchecking a single value.",
        },
        {
          icon: <TimeIcon />,
          type: FormElementType.TIME,
          label: "Time",
          description: "A field for entering time values.",
        },
        {
          icon: <DateIcon />,
          type: FormElementType.DATE,
          label: "Date",
          description: "A field for entering date values.",
        },
        {
          icon: <DateTimeIcon />,
          type: FormElementType.DATE_TIME,
          label: "Date & Time",
          description: "A field for entering date and time values.",
        },
      ],
    },
  ];

  const handleAdd = (type: FormElementType) => (): void => {
    const schemas: Record<FormElementType, unknown> = {
      // Blocks
      [FormElementType.TEXT]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Text Element",
        content: "This is a new text element.",
      },
      [FormElementType.IMAGE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Image Element",
        url: "https://picsum.photos/200/300",
      },
      [FormElementType.CODE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Code Element",
        content: "<p>This is a new code element.</p>",
      },
      [FormElementType.DIVIDER]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Divider Element",
      },
      // Fields
      [FormElementType.PLAIN_TEXT]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Plain Text Element",
      },
      [FormElementType.RICH_TEXT]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Rich Text Element",
      },
      [FormElementType.NUMBER]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Number Element",
      },
      [FormElementType.EMAIL]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Email Element",
      },
      [FormElementType.PHONE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Phone Element",
      },
      [FormElementType.CHECKBOX]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Checkbox Element",
      },
      [FormElementType.TIME]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Time Element",
      },
      [FormElementType.DATE]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Date Element",
      },
      [FormElementType.DATE_TIME]: {
        type,
        name: `element${elements.length + 1}`,
        label: "New Date Time Element",
      },
    };

    const element = FormElementSchema.parse(schemas[type]);

    append(element);
    selectElement(element);
  };

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "center", vertical: "center" }}
      >
        <Stack
          spacing={2}
          sx={{
            width: 300,
            height: 500,
            padding: (theme) => theme.spacing(2, 3, 3),
            overflowY: "auto",
          }}
        >
          {options.map((option) => (
            <Stack key={option.title} spacing={1}>
              <Typography variant="h6" fontWeight="bolder">
                {option.title}
              </Typography>

              <Grid container spacing={0.5}>
                {option.elements.map((element) => (
                  <Tooltip
                    key={element.label}
                    title={element.description}
                    placement="left-start"
                  >
                    <Grid
                      xs={6}
                      justifyContent="center"
                      alignItems="center"
                      onClick={handleAdd(element.type)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: (theme) => theme.spacing(0.5),
                        padding: (theme) => theme.spacing(1.5),
                        border: (theme) =>
                          `1px dashed ${theme.palette.divider}`,
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: (theme) =>
                            theme.palette.action.hover,
                        },
                      }}
                    >
                      <Typography>{element.label}</Typography>
                      {element.icon}
                    </Grid>
                  </Tooltip>
                ))}
              </Grid>
            </Stack>
          ))}
        </Stack>
      </Popover>

      <Button
        fullWidth
        size="small"
        variant="outlined"
        color="primary"
        endIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add Element
      </Button>
    </>
  );
}
