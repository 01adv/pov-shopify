import Header from "@/components/Header";
import { AssistantChat } from "@/components/chatbot/Assistant";
import ChatBot from "@/components/chatbot/ChatBot";
import { ProductProvider } from "@/hooks/useProduct";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import type React from "react";
import "./globals.css";
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
      <body className={`${quicksand.variable} font-sans`}>
        <ProductProvider>
          <Header />
          <ChatBot />
          <AssistantChat />
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
          {children}
          {/* </ThemeProvider> */}
        </ProductProvider>
      </body>
    </html>
  );
}
