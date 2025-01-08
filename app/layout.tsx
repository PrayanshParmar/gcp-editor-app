import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GCP App",
  description: "ground control points",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
