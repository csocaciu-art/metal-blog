'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        const filenames: string[] = await response.json();
        if (filenames.length > 0) {
          const images = filenames.map(name => `/images/${name}`);
          const randomIndex = Math.floor(Math.random() * images.length);
          setBackgroundImage(images[randomIndex]);
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (backgroundImage) {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
    }
  }, [backgroundImage]);

  return (
    <html lang="en" data-bs-theme="dark">
      <head>
        <title>Metal Blog</title>
      </head>
      <body>
        <div className="container mt-4">
          <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
              <li className="nav-item"><Link href="/" className="nav-link active" aria-current="page">Metal Blog</Link></li>
            </ul>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
