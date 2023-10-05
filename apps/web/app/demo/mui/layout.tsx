import type { Metadata } from "next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeRegistry } from "~/theme";

export const metadata: Metadata = {
  title: "QikForm - MUI",
  description: "QikForm - Material UI",
};

interface MuiDemoLayoutProps {
  children: React.ReactElement;
}

export default function MuiDemoLayout({
  children,
}: MuiDemoLayoutProps): React.ReactElement {
  return <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>;
}
