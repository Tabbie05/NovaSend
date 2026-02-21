import type { Metadata } from "next";
import { Sora, Source_Sans_3 } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  title: "NovaSend - Unified Inbox",
  description: "Generate and send AI-crafted marketing messages via WhatsApp and SMS.",
  openGraph: {
    title: "NovaSend",
    description: "Unified inbox for AI-powered WhatsApp and SMS marketing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <SessionProvider>
          <ThemeProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: "var(--toast-bg)",
                  color: "var(--toast-color)",
                  border: "1px solid var(--toast-border)",
                  borderRadius: "12px",
                  fontSize: "13px",
                },
              }}
            />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
