import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eyad Ahmed — Social Media & Marketing",
  description: "Eyad Ahmed is a Social Media Specialist & Marketing Expert based in Cairo, Egypt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
