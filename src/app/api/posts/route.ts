import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'posts.json');

const readPosts = () => {
  const postsData = fs.readFileSync(postsFilePath, 'utf-8');
  return JSON.parse(postsData);
};

const writePosts = (posts: any[]) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
};

export async function GET() {
  const posts = readPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const posts = readPosts();
  const newPostId = (parseInt(posts[posts.length - 1].id) + 1).toString();
  const newPost: any = {
    id: newPostId,
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    content: formData.get('content'),
    imageUrls: [],
  };

  const images = formData.getAll('image') as File[];
  if (images && images.length > 0) {
    const postImagesDir = path.join(process.cwd(), 'public', 'images', newPostId);
    if (!fs.existsSync(postImagesDir)) {
      fs.mkdirSync(postImagesDir, { recursive: true });
    }

    for (const image of images) {
      if (image.size > 0) {
        const imageName = Date.now() + '-' + image.name;
        const imagePath = path.join(postImagesDir, imageName);
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fs.writeFileSync(imagePath, buffer);
        newPost.imageUrls.push(`/images/${newPostId}/${imageName}`);
      }
    }
  }

  posts.push(newPost);
  writePosts(posts);
  return NextResponse.json(newPost, { status: 201 });
}
