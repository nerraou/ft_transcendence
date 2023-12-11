import ReactQueryProvider from "@providers/ReactQueryProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Electrolize } from "next/font/google";
import AuthSessionProvider from "@components/providers/SessionProvider";

const electrolize = Electrolize({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PongBoy",
  description: "PongBoy",
  icons: "/icon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={electrolize.className}>
      <body>
        <AuthSessionProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
