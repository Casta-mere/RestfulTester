import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import { Container, Theme } from "@radix-ui/themes";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restful Tester",
  description: "Castamere's Restful Tester",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <div className="flex min-h-screen">
            <Sidebar />
            <Container>{children}</Container>
          </div>
        </Theme>
      </body>
    </html>
  );
}
