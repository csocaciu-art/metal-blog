import path from 'path';
import { randomUUID } from 'crypto';

const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
const allowedMimePrefixes = ['image/'];

export const parseRequiredField = (formData: FormData, field: string) => {
  const value = formData.get(field);
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const filterImageFiles = (entries: FormDataEntryValue[]) =>
  entries.filter((entry): entry is File => entry instanceof File);

export const isAllowedImage = (file: File) =>
  file.size > 0 &&
  allowedMimePrefixes.some((prefix) => file.type?.startsWith(prefix)) &&
  allowedExtensions.has(
    path.extname(path.basename(file.name || '')).toLowerCase()
  );

export const buildSafeImageName = (originalName: string) => {
  const ext = path.extname(path.basename(originalName || '')).toLowerCase();
  if (!allowedExtensions.has(ext)) {
    return null;
  }
  return `${Date.now()}-${randomUUID()}${ext}`;
};
