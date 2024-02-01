import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";

export const BASE_MUI_TIPTAP_EXTENSIONS = [
  StarterKit.configure({ bulletList: false, orderedList: false }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
];
