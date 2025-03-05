import { Outfit, Vazirmatn } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import {NextDevtoolsProvider} from "@next-devtools/core";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});


const vazir = Vazirmatn({
  variable: "--font-vazirmatn-sans",
  subsets: ["arabic"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vazir.variable} dark:bg-gray-900`}>

        <ThemeProvider>
          <SidebarProvider>
              <NextDevtoolsProvider>
                  {children}
              </NextDevtoolsProvider>
              </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
