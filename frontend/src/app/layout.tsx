import ReactQueryProvider from "@providers/ReactQueryProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Electrolize } from "next/font/google";

const electrolize = Electrolize({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home",
  description: "home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={electrolize.className}>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
