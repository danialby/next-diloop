// import { Outfit } from "next/font/google";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

// const outfit = Outfit({
//   variable: "--font-outfit-sans",
//   subsets: ["latin"],
// });


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
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
