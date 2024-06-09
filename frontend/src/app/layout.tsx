import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ReduxProvider from "./store/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axpo auction",
  description: "Future of auctions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider pageProps={{}}>
          <div id="tooltip-root"></div>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
