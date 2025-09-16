'use client';

'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { useEffect, useState } from "react";

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
      <body>
        <div className="container mt-4">
          {children}
        </div>
      </body>
    </html>
  );
}
