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
  const updatedPost = await request.json();
  const posts = readPosts();
  const postIndex = posts.findIndex((p: any) => p.id === params.slug);

  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], ...updatedPost };
    writePosts(posts);
    return NextResponse.json(posts[postIndex]);
  } else {
    return new NextResponse('Post not found', { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  let posts = readPosts();
  const initialLength = posts.length;
  posts = posts.filter((p: any) => p.id !== params.slug);

  if (posts.length < initialLength) {
    writePosts(posts);
    return new NextResponse('Post deleted', { status: 200 });
  } else {
    return new NextResponse('Post not found', { status: 404 });
  }
}
