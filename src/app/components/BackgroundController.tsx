'use client';

import { useEffect, useState } from "react";

export default function BackgroundController() {
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
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
    }
  }, [backgroundImage]);

  return null; // This component does not render anything itself
}
