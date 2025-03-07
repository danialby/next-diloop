import {vazirfd} from "@/plugins/fonts";
import "./globals.css";
import { QueryProvider } from "@/context/QueryProvider";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vazirfd.variable} dark:bg-gray-900`}>
            <ThemeProvider>
                  <SidebarProvider>
                     <QueryProvider>
                      {children}
                     </QueryProvider>
                  </SidebarProvider>
            </ThemeProvider>
      </body>
    </html>
  );
}
