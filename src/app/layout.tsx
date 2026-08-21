import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healthbase",
  description: "A calm, trusted health companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerifDisplay.variable}`}>
      <body suppressHydrationWarning className="bg-background text-foreground font-sans antialiased">
        <div className="mx-auto max-w-[390px] min-h-screen shadow-sm overflow-x-hidden bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
