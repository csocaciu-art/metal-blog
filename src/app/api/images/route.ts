import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const imagesDirectory = path.join(process.cwd(), 'public', 'images');
  try {
    const filenames = await fs.promises.readdir(imagesDirectory);
    const imageFiles = filenames.filter(file =>
      file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.gif')
    );
    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Failed to read images directory:', error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}
