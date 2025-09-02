import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SmartStake - Win Big with Smart Gambling",
  description: "Join thousands of winners at SmartStake! Get instant bonuses, exclusive games, and VIP treatment. Start winning today with our smart gambling platform.",
  keywords: "gambling, casino, betting, slots, poker, blackjack, roulette, bonuses, online casino",
  openGraph: {
    title: "SmartStake - Win Big with Smart Gambling",
    description: "Join thousands of winners at SmartStake! Get instant bonuses, exclusive games, and VIP treatment.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartStake - Win Big with Smart Gambling",
    description: "Join thousands of winners at SmartStake! Get instant bonuses, exclusive games, and VIP treatment.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
