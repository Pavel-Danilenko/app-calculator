// app/layout.tsx or similar file based on your structure
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Suspense } from "react";
import Loading from "../components/Loading";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: {
    default: "Owl Sentry - Profit Calculator | Automated Deratization",
  },
  description:
    "Owl Sentry Calculator | Automated deratization system with 24/7 full information on all events in real time. Empower your pest-control business with cutting-edge IoT System",
  keywords: [
    "Owl Sentry",
    "IoT",
    "Start-up",
    "Sensors",
    "DDD",
    "Mice",
    "Rat",
    "Rats",
    "Automated deratization",
    "Monitoring",
  ],
  authors: [{ name: "Owl Sentry", url: "https://owlsentry.com" }],
  creator: "Owl Sentry",
  publisher: "Owl Sentry",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    url: "https://calculator.owlsentry.com",
    type: "website",
    title: "Owl Sentry Calculator",
    description:
      "Owl Sentry Calculator | Automated deratization system with 24/7 full information on all events in real time. Empower your pest-control business with cutting-edge IoT System",
  },
  twitter: {
    title: "Owl Sentry Calculator",
    description:
      "Owl Sentry Calculator | Automated deratization system with 24/7 full information on all events in real time. Empower your pest-control business with cutting-edge IoT System",
  },
  alternates: {
    canonical: "https://calculator.owlsentry.com",
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className=" scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-white scrollbar-track-[#1B1464] "
    >
      <body className={`${poppins.className} relative`}>
        <Suspense fallback={<Loading />}>
          <Header />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
