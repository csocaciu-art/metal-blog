import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
  buildSafeImageName,
  filterImageFiles,
  isAllowedImage,
  parseRequiredField,
} from '@/lib/postMedia';
import { nextPostId, readPosts, writePosts, type StoredPost } from '@/lib/postsStore';

export async function GET() {
  const posts = await readPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = parseRequiredField(formData, 'title');
    const excerpt = parseRequiredField(formData, 'excerpt');
    const content = parseRequiredField(formData, 'content');

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'title, excerpt and content are required.' },
        { status: 400 },
      );
    }

    const posts = await readPosts();
    const newPostId = nextPostId(posts);
    const newPost: StoredPost = {
      id: newPostId,
      title,
      excerpt,
      content,
      imageUrls: [],
    };

    const images = filterImageFiles(formData.getAll('image'));
    if (images.length > 0) {
      const postImagesDir = path.join(process.cwd(), 'public', 'images', newPostId);
      await fs.mkdir(postImagesDir, { recursive: true });

      for (const image of images) {
        if (!isAllowedImage(image)) {
          continue;
        }
        const sanitizedName = buildSafeImageName(image.name);
        if (!sanitizedName) {
          continue;
        }
        const imagePath = path.join(postImagesDir, sanitizedName);
        const bytes = await image.arrayBuffer();
        await fs.writeFile(imagePath, Buffer.from(bytes));
        newPost.imageUrls.push(`/images/${newPostId}/${sanitizedName}`);
      }
    }

    posts.push(newPost);
    await writePosts(posts);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Failed to create post', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
