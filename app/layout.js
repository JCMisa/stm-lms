import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "STMLMS",
  description: "Learning. Growing. Succeeding.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      layout: {
        logoImageUrl: "/logo.svg",
        socialButtonsVariant: "iconButton",
      },
      variables: {
        colorText: "#000000",
        colorPrimary: "#0C359E",
        colorBackground: "#F6F5F5",
        colorInputBackground: "#FFE3CA",
        colorInputText: "#000000",
      },
    }}>
      <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider>
            {children}
          </Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}