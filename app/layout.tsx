import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eyad Ahmed — Social Media & Marketing",
  description: "Eyad Ahmed is a Social Media & Marketing Specialist based in Cairo, Egypt — producing content for brands including Bundesliga, FC Bayern Munich, and Enactus.",
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
