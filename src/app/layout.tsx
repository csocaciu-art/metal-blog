import type { Metadata } from "next";
import { Eagle_Lake } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import BackgroundController from "./components/BackgroundController";

const eagleLake = Eagle_Lake({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Metal Blog",
  description: "A blog about metal music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={eagleLake.className}>
        <BackgroundController />
        <div className="container mt-4">
          <header className="d-flex justify-content-center py-3">
            <Link href="/">
              <img src="/images/banner.jpg" alt="Metal Blog Banner" style={{ height: '150px' }} />
            </Link>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}