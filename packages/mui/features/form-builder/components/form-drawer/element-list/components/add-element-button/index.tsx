"use client";

import { Fragment } from "react";
import {
  Drawer,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  Tooltip,
} from "@mui/material";
import {
  AddCircle as AddIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  HorizontalRule as DividerIcon,
  InsertPageBreak as PageBreakIcon,
  ShortText as PlainTextIcon,
  WrapText as RichTextIcon,
  Numbers as NumberIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Link as URLIcon,
  CheckBox as CheckboxIcon,
  ToggleOn as SwitchIcon,
  RadioButtonChecked as SingleChoiceIcon,
  LibraryAddCheck as MultipleChoiceIcon,
  ArrowDropDownCircle as SelectIcon,
  AccessTime as TimeIcon,
  CalendarMonth as DateIcon,
  Event as DateTimeIcon,
} from "@mui/icons-material";

import { FormElementType } from "@qikform/core";

import { useFormDrawerAddElementButton } from "./hooks";

export function AddElementButton(): React.ReactElement {
  const {
    isElementsDrawerOpen,
    openElementsDrawer,
    closeElementsDrawer,
    addElement,
  } = useFormDrawerAddElementButton();

  return (
    <>
      <Drawer
        anchor="right"
        open={isElementsDrawerOpen}
        onClose={closeElementsDrawer}
      >
        <List disablePadding sx={{ width: 250 }}>
          {sections.map((section) => (
            <Fragment key={section.title}>
              <ListSubheader>{section.title}</ListSubheader>

              {section.elements.map((element) => (
                <ListItem key={element.label} disablePadding>
                  <Tooltip title={element.description} placement="left-start">
                    <ListItemButton onClick={addElement(element.type)}>
                      <ListItemIcon>{element.icon}</ListItemIcon>
                      <ListItemText>{element.label}</ListItemText>
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </Fragment>
          ))}
        </List>
      </Drawer>

      <Button
        fullWidth
        size="small"
        variant="outlined"
        color="primary"
        endIcon={<AddIcon />}
        onClick={openElementsDrawer}
      >
        Add Element
      </Button>
    </>
  );
}

const sections = [
  {
    title: "Meaningful",
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
    ],
  },
  {
    title: "Layout",
    elements: [
      {
        icon: <DividerIcon />,
        type: FormElementType.DIVIDER,
        label: "Divider",
        description:
          "A horizontal line or divider used to separate content sections.",
      },
      {
        icon: <PageBreakIcon />,
        type: FormElementType.PAGE_BREAK,
        label: "Page Break",
        description:
          "A page break that can be used to separate your form into multiple pages.",
      },
    ],
  },
  {
    title: "Text",
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
    ],
  },
  {
    title: "Number",
    elements: [
      {
        icon: <NumberIcon />,
        type: FormElementType.NUMBER,
        label: "Number",
        description:
          "A field for entering numerical values like integers or decimals.",
      },
    ],
  },
  {
    title: "Contact",
    elements: [
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
        icon: <URLIcon />,
        type: FormElementType.URL,
        label: "URL",
        description: "A field for entering website URLs.",
      },
    ],
  },
  {
    title: "Choices",
    elements: [
      {
        icon: <CheckboxIcon />,
        type: FormElementType.CHECKBOX,
        label: "Checkbox",
        description: "A field for checking or unchecking a single value.",
      },
      {
        icon: <SwitchIcon />,
        type: FormElementType.SWITCH,
        label: "Switch",
        description: "A field for toggling between two values.",
      },
      {
        icon: <SingleChoiceIcon />,
        type: FormElementType.SINGLE_CHOICE,
        label: "Single Choice",
        description:
          "A field for selecting a single value from a list of options.",
      },
      {
        icon: <MultipleChoiceIcon />,
        type: FormElementType.MULTIPLE_CHOICE,
        label: "Multiple Choice",
        description:
          "A field for selecting multiple values from a list of options.",
      },
      {
        icon: <SelectIcon />,
        type: FormElementType.SELECT,
        label: "Select (Dropdown)",
        description:
          "A field for selecting a single value or multiple values from a dropdown list.",
      },
    ],
  },
  {
    title: "Date & Time",
    elements: [
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
] satisfies {
  title: string;
  elements: {
    icon: React.ReactElement;
    type: FormElementType;
    label: string;
    description: string;
  }[];
}[];
