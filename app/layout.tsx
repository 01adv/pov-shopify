import Header from "@/components/Header";
import { AssistantChat } from "@/components/chatbot/Assistant";
import { ProductProvider } from "@/hooks/useProduct";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import type React from "react";
import "./globals.css";
import GlobalChatUi from "@/components/chatbot/GlobalChatUi";
// import { ThemeProvider } from "@/components/theme-provider"

// Import Quicksand font from Google Fonts
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "POV - Women's Workwear",
  description: "Functional workwear with pockets for women",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${quicksand.variable} font-sans`}>
        <ProductProvider>
          <Header />
          {/* <AssistantChat /> */}
          <GlobalChatUi />
          {children}
        </ProductProvider>
      </body>
    </html>
  );
}
