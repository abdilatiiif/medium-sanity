import Image from "next/image";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { client } from "../../../sanity/client";
import { urlFor } from "../../../sanity/lib/image";
import { getPostBySlug } from "../../../api/getPostBySlug";

const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{
  "post": slug.current
}`;

const options = { next: { revalidate: 30 } };

type PortableTextImageBlock = {
  _key: string;
  _type: "image";
  alt?: string;
  asset?: { _ref?: string };
};

export async function generateStaticParams() {
  return client.fetch<Array<{ post: string }>>(POST_SLUGS_QUERY, {}, options);
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post } = await params;
  const slug = decodeURIComponent(post);
  const postData = await getPostBySlug(slug);

  if (!postData) {
    notFound();
  }

  const heroImageUrl = postData.image
    ? urlFor(postData.image).width(1400).height(800).url()
    : null;

  const body = Array.isArray(postData.body) ? postData.body : [];

  const portableTextComponents = {
    types: {
      image: ({ value }: { value: PortableTextImageBlock }) => {
        if (!value?.asset?._ref) {
          return null;
        }

        const bodyImageUrl = urlFor(value).width(1200).height(800).url();

        return (
          <Image
            src={bodyImageUrl}
            alt={value.alt || "Post image"}
            width={1200}
            height={800}
            loading="eager"
            className="my-6 h-auto w-full rounded-lg object-cover"
          />
        );
      },
    },
    marks: {
      link: ({
        value,
        children,
      }: {
        value?: { href?: string };
        children: ReactNode;
      }) => {
        const href = value?.href || "#";
        return (
          <a
            href={href}
            className="text-pink-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      {heroImageUrl && (
        <Image
          src={heroImageUrl}
          alt={postData.title}
          width={1400}
          height={800}
          loading="eager"
          className="mb-6 h-auto w-full rounded-xl object-cover"
        />
      )}

      <h1 className="mb-2 text-4xl font-bold">{postData.title}</h1>
      <p className="mb-1 text-sm text-gray-600">
        {new Date(postData.publishedAt).toLocaleDateString()}
      </p>
      <p className="mb-8 text-sm text-gray-700">By {postData.author?.name}</p>

      <div className="space-y-4 text-base leading-7 text-gray-900">
        <PortableText value={body} components={portableTextComponents} />
      </div>
    </main>
  );
}
