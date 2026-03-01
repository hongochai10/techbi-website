import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

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
  title: "TechBI — Tech Boundary Imagination | Digital Transformation Company",
  description:
    "TechBI is a leading digital transformation company specializing in AI/ML, Cloud Architecture, Custom Software Development, Data Analytics, and Cybersecurity. We transform businesses through boundary-breaking technology.",
  keywords: [
    "TechBI",
    "Tech Boundary Imagination",
    "Digital Transformation",
    "AI",
    "Machine Learning",
    "Cloud Architecture",
    "Custom Software Development",
    "Data Analytics",
    "Cybersecurity",
    "Enterprise Technology",
    "IT Consulting",
  ],
  openGraph: {
    title: "TechBI — Tech Boundary Imagination",
    description: "Leading digital transformation company. From strategy to deployment, we build what moves businesses forward.",
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
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="noise-overlay antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
