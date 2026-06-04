import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL?.trim() || "http://localhost:3000"),
  title: {
    default: "Cetromotos | Motos, financiacion y entrega en Zarate",
    template: "%s | Cetromotos",
  },
  description:
    "Catalogo de motos nuevas y usadas en Zarate, Buenos Aires. Consulta modelos, fichas tecnicas, financiacion y disponibilidad en sucursal.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cetromotos | Motos, financiacion y entrega en Zarate",
    description:
      "Motos urbanas, scooters, street y todo terreno con asesoramiento personalizado y financiacion.",
    url: "/",
    siteName: "Cetromotos",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cetromotos | Motos, financiacion y entrega en Zarate",
    description:
      "Consulta modelos, fichas tecnicas, financiacion y disponibilidad en sucursal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            try {
              var t = localStorage.getItem("cetromotos-theme");
              var d = t
                ? t === "dark"
                : matchMedia("(prefers-color-scheme: dark)").matches;

              document.documentElement.classList.toggle("dark", d);
              document.documentElement.style.colorScheme = d ? "dark" : "light";
            } catch (e) {}
          `}
        </Script>
        <Navbar />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
