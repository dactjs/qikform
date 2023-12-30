import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "QikForm - Tailwind",
  description: "QikForm - Tailwind CSS",
};

interface TailwindDemoLayoutProps {
  children: React.ReactElement;
}

export default function TailwindDemoLayout({
  children,
}: TailwindDemoLayoutProps): React.ReactElement {
  return children;
}
