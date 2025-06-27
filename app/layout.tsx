'use client'
import Header from "@/components/Header";
import { AssistantChat } from "@/components/chatbot/Assistant";
import { ProductProvider } from "@/hooks/useProduct";
import { useRealViewportHeight } from "@/hooks/useRealViewportHeight";
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

// export const metadata: Metadata = {
//   title: "POV - Women's Workwear",
//   description: "Functional workwear with pockets for women",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useRealViewportHeight()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      {/* <body className={`${quicksand.variable} font-sans`}> */}
      <body
        className={`${quicksand.variable} font-sans`}
        style={{ height: "calc(var(--vh, 1vh) * 100)", overflow: "hidden" }} // ← Crucial
      >
        <ProductProvider>
          {/* <ChatBot /> */}
          <AssistantChat />
          <div className="h-full overflow-y-auto">
            <Header />
            {children}
          </div>
        </ProductProvider>
      </body>
    </html>
  );
}
