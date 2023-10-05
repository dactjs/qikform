import type { CreateForm } from "@qikform/core";
import { FormElementType } from "@qikform/core";

const code = `
<style>
  .container {
    display: grid;
    place-content: center;
    height: 200px;
    padding: 16px;
    text-align: center;
    border-radius: 4px;
    border: 1px dashed currentColor;
  }
</style>

<div class="container">
  <h1>Code Block</h1>
  <p>This is a code block</p>
</div>
`;

export const schema = {
  title: "This is a form",
  description: "This is a description",
  elements: [
    {
      type: FormElementType.TEXT,
      name: "text",
      label: "Text Block",
      content: "This is a text block",
    },
    {
      type: FormElementType.IMAGE,
      name: "image",
      label: "Image Block",
      url: "https://picsum.photos/600/200",
    },
    {
      type: FormElementType.CODE,
      name: "code",
      label: "Code Block",
      content: code,
    },
    {
      type: FormElementType.DIVIDER,
      name: "divider",
      label: "Divider Block",
    },
    {
      type: FormElementType.PLAIN_TEXT,
      name: "plainText",
      label: "Plain Text Field",
    },
    {
      type: FormElementType.RICH_TEXT,
      name: "richText",
      label: "Rich Text Field",
    },
    {
      type: FormElementType.NUMBER,
      name: "number",
      label: "Number Field",
    },
  ],
} satisfies CreateForm;
