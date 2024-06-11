import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ReduxProvider from "./store/storeProvider";
import AuthContext from "./utils/AuthContext";

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
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <ReduxProvider pageProps={{}}>
          <AuthContext>
            <div id="tooltip-root"></div>
            {children}
          </AuthContext>
        </ReduxProvider>
      </body>
    </html>
  );
}
