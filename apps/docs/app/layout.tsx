import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QikForm",
  description: "QikForm - Docs",
};

interface RootLayoutProps {
  children: React.ReactElement;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
