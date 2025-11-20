import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import {
  buildSafeImageName,
  filterImageFiles,
  isAllowedImage,
  parseRequiredField,
} from '@/lib/postMedia';
import { readPosts, writePosts, type StoredPost } from '@/lib/postsStore';

const filterExistingUrls = (entries: FormDataEntryValue[], slug: string) =>
  entries
    .filter((entry): entry is string => typeof entry === 'string')
    .filter(url => url.startsWith(`/images/${slug}/`));

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const posts = await readPosts();
  const post = posts.find((p: StoredPost) => p.id === params.slug);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
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
    const postIndex = posts.findIndex(post => post.id === params.slug);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const existingImageUrls = filterExistingUrls(
      formData.getAll('existingImageUrls'),
      params.slug,
    );
    const currentImages = posts[postIndex].imageUrls ?? [];
    const imagesToDelete = currentImages.filter(url => !existingImageUrls.includes(url));

    for (const imageUrl of imagesToDelete) {
      const imagePath = path.join(process.cwd(), 'public', imageUrl);
      await fs.rm(imagePath, { force: true });
    }

    const updatedPost: StoredPost = {
      ...posts[postIndex],
      title,
      excerpt,
      content,
      imageUrls: [...existingImageUrls],
    };

    const newImages = filterImageFiles(formData.getAll('image'));
    if (newImages.length > 0) {
      const postImagesDir = path.join(process.cwd(), 'public', 'images', params.slug);
      await fs.mkdir(postImagesDir, { recursive: true });

      for (const image of newImages) {
        if (!isAllowedImage(image)) {
          continue;
        }
        const imageName = buildSafeImageName(image.name);
        if (!imageName) {
          continue;
        }

        const imagePath = path.join(postImagesDir, imageName);
        const bytes = await image.arrayBuffer();
        await fs.writeFile(imagePath, Buffer.from(bytes));
        updatedPost.imageUrls.push(`/images/${params.slug}/${imageName}`);
      }
    }

    posts[postIndex] = updatedPost;
    await writePosts(posts);
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Failed to update post', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const posts = await readPosts();
    const postIndex = posts.findIndex(post => post.id === params.slug);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postImagesDir = path.join(process.cwd(), 'public', 'images', params.slug);
    await fs.rm(postImagesDir, { recursive: true, force: true });

    posts.splice(postIndex, 1);
    await writePosts(posts);
    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Failed to delete post', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
