import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.haojunmah.app"),
  title: {
    default: "Haojun Mah | Software Engineer Portfolio",
    template: "%s | Haojun Mah",
  },
  description:
    "Haojun Mah's portfolio featuring software engineering projects, AI work, and parallel computing experience from NUS.",
  applicationName: "Haojun Mah Portfolio",
  keywords: [
    "Haojun Mah",
    "haojunmah",
    "NUS",
    "portfolio",
    "haojunmah nus",
    "nus haojun mah",
    "haojun mah portfolio",
    "haojun mah projects",
    "haojun mah software engineer",
  ],
  authors: [
    {
      name: "Haojun Mah",
      url: "https://www.haojunmah.app",
    },
  ],
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    type: "website",
    url: "https://www.haojunmah.app/home",
    siteName: "Haojun Mah Portfolio",
    title: "Haojun Mah | Software Engineer Portfolio",
    description:
      "Haojun Mah's portfolio featuring software engineering projects, AI work, and parallel computing experience from NUS.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haojun Mah | Software Engineer Portfolio",
    description:
      "Haojun Mah's portfolio featuring software engineering projects, AI work, and parallel computing experience from NUS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: [{ url: "/yuru-camp.png", type: "image/png" }],
    shortcut: [{ url: "/yuru-camp.png", type: "image/png" }],
    apple: [{ url: "/yuru-camp.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
