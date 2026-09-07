import type { Metadata } from "next";
import { FontFaces } from "@/components/FontFaces";
import { PageBackground } from "@/components/PageBackground";
import { copy } from "@/lib/copy";
import { darkmode, monaco } from "./fonts";
import "./fonts.css";
import "./globals.css";
import "./craft.css";

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${darkmode.variable} ${monaco.variable}`}>
      <body>
        <FontFaces />
        <PageBackground />
        {children}
      </body>
    </html>
  );
}
