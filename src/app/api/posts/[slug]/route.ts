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

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const posts = readPosts();
  const post = posts.find((p: any) => p.id === params.slug);

  if (post) {
    return NextResponse.json(post);
  } else {
    return new NextResponse('Post not found', { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const formData = await request.formData();
  const posts = readPosts();
  const postIndex = posts.findIndex((p: any) => p.id === params.slug);

  if (postIndex !== -1) {
    const updatedPost: any = {
      ...posts[postIndex],
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
    };

    const postImagesDir = path.join(process.cwd(), 'public', 'images', params.slug);
    if (!fs.existsSync(postImagesDir)) {
      fs.mkdirSync(postImagesDir, { recursive: true });
    }

    const existingImageUrls = formData.getAll('existingImageUrls') as string[];
    const imagesToDelete = (posts[postIndex].imageUrls || []).filter((url: string) => !existingImageUrls.includes(url));
    for (const imageUrl of imagesToDelete) {
      const imagePath = path.join(process.cwd(), 'public', imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    updatedPost.imageUrls = existingImageUrls;

    const newImages = formData.getAll('image') as File[];
    if (newImages && newImages.length > 0) {
      for (const image of newImages) {
        if (image.size > 0) {
          const imageName = Date.now() + '-' + image.name;
          const imagePath = path.join(postImagesDir, imageName);
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          fs.writeFileSync(imagePath, buffer);
          updatedPost.imageUrls.push(`/images/${params.slug}/${imageName}`);
        }
      }
    }

    posts[postIndex] = updatedPost;
    writePosts(posts);
    return NextResponse.json(posts[postIndex]);
  } else {
    return new NextResponse('Post not found', { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  let posts = readPosts();
  const postIndex = posts.findIndex((p: any) => p.id === params.slug);

  if (postIndex !== -1) {
    const postImagesDir = path.join(process.cwd(), 'public', 'images', params.slug);
    if (fs.existsSync(postImagesDir)) {
      fs.rmSync(postImagesDir, { recursive: true, force: true });
    }
    posts.splice(postIndex, 1);
    writePosts(posts);
    return new NextResponse('Post deleted', { status: 200 });
  } else {
    return new NextResponse('Post not found', { status: 404 });
  }
}
