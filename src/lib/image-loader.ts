"use client";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function imageLoader({ src }: ImageLoaderProps) {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const normalizedSrc = src.startsWith("/") ? src : `/${src}`;

  if (basePath && normalizedSrc.startsWith(`${basePath}/`)) {
    return normalizedSrc;
  }

  return `${basePath}${normalizedSrc}`;
}

