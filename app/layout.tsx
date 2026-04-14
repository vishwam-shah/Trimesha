import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { ModalProvider } from "@/components/ui/animated-modal";
// import { ConditionalModalAndChat } from "@/components/layout/conditional-modal-and-chat";
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
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>    
        <Script
          id="chatbot-config"
          dangerouslySetInnerHTML={{
            __html: `window.ChatBotConfig = { apiKey: 'wgt_live_780b9f40dc8c2cc8ca9a1f572f85937e8286de8a9ae9bb6c0d9bea09ffbcdaa8' };`,
          }}
        />
        <Script src="https://backendnode-development.up.railway.app/chatbot-widget.js" />
        <AuthProvider>
          <ModalProvider>
            <PageTransitionProvider variant="fadeBlur">
              {children}
            </PageTransitionProvider>
            <ConditionalFooter />
            {/* <ConditionalModalAndChat /> */}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}