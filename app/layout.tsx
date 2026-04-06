import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { ModalProvider } from "@/components/ui/animated-modal";
import { ConditionalModalAndChat } from "@/components/layout/conditional-modal-and-chat";
import { AuthProvider } from "@/components/providers/auth-provider";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Trimesha - Digital Solutions",
  description: "End-to-end digital solutions to transform your business",
  icons: {
    icon: "./favicon/favicon.ico",
    apple: "./favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <AuthProvider>
          <ModalProvider>
            <PageTransitionProvider variant="fadeBlur">
              {children}
            </PageTransitionProvider>
            <ConditionalFooter />
            <ConditionalModalAndChat />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
