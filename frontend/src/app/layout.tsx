import ReactQueryProvider from "@providers/ReactQueryProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Electrolize } from "next/font/google";
import AuthSessionProvider from "@components/providers/SessionProvider";
import { SocketProvider } from "@contexts/socket";

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
          <SocketProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </SocketProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
