import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "./auth-provider";
import { QueryProvider } from "./query-provider";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Sharing App",
  description: "Compile your links, and share.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
        <QueryProvider>
          <AuthProvider>
            <Toaster position="top-right" richColors duration={2000} />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
