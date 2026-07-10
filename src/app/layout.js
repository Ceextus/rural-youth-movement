import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/layout/SplashScreen";

const clashDisplay = localFont({
  variable: "--font-clash-display",
  display: "swap",
  src: [
    { path: "../fonts/clash-display/ClashDisplay-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/clash-display/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: {
    default: "Rural Youth Movement (RYM)",
    template: "%s | RYM",
  },
  description:
    "Mobilising the grassroots for rural development and civic participation across Nigeria's 36 states.",
  keywords: [
    "Rural Youth Movement",
    "RYM",
    "Nigeria",
    "rural development",
    "youth empowerment",
    "civic participation",
    "grassroots",
    "community development",
  ],
  authors: [{ name: "Rural Youth Movement" }],
  creator: "Rural Youth Movement",
  metadataBase: new URL("https://rym.ng"),
  openGraph: {
    title: "Rural Youth Movement (RYM)",
    description:
      "Mobilising the grassroots for rural development and civic participation across Nigeria's 36 states.",
    url: "https://rym.ng",
    siteName: "Rural Youth Movement",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/rym-logo.png",
        width: 512,
        height: 512,
        alt: "Rural Youth Movement Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Rural Youth Movement (RYM)",
    description:
      "Mobilising the grassroots for rural development and civic participation across Nigeria's 36 states.",
    images: ["/images/brand/rym-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-background text-on-background font-body-md min-h-full flex flex-col overflow-x-hidden relative">
        <SplashScreen />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
