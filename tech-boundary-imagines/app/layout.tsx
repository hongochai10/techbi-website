import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech Boundary Imagines — Where Future Begins",
  description:
    "A pioneering platform at the bleeding edge of technology — AI, Quantum Computing, Neural Interfaces, and Web3. Imagine the impossible. Build the future.",
  keywords: [
    "Tech Boundary",
    "AI",
    "Quantum Computing",
    "Neural Interfaces",
    "Web3",
    "Future Technology",
    "WebGL",
    "Innovation",
  ],
  openGraph: {
    title: "Tech Boundary Imagines",
    description: "Where the future ceases to be fiction.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="noise-overlay antialiased">{children}</body>
    </html>
  );
}
