import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "../../../sanity/client";
import { urlFor } from "../../../sanity/lib/image";
import { getPostBySlug } from "../../../api/getPostBySlug";

const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{
  "post": slug.current
}`;

const options = { next: { revalidate: 30 } };

export async function generateStaticParams() {
  return client.fetch<Array<{ post: string }>>(POST_SLUGS_QUERY, {}, options);
}
// POST_SLUGS_QUERY + generateStaticParams:
// Nødvendig bare hvis du vil pre-generere post-sider (statisk ved build) for kjente slugs.

export default async function PostPage({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post } = await params;

  console.log("henter siden:", post); // Debugging: Sjekk hvilken slug som behandles
  const slug = decodeURIComponent(post); // Dekoder URL-enkodet slug for å matche Sanity-data
  const postData = await getPostBySlug(slug); // Henter post-data basert på den dekodede slug-en

  if (!postData) {
    notFound();
  }

  const heroImage = postData.image
    ? urlFor(postData.image).width(1400).height(800).url()
    : null;

  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">
      {heroImage ? (
        <Image
          src={heroImage}
          alt={postData.title}
          width={1400}
          height={800}
          className="mb-6 h-auto w-full rounded-xl object-top-left"
        />
      ) : null}

      <h1 className="mb-2 text-4xl font-bold">{postData.title}</h1>
      <p className="mb-1 text-sm text-gray-600">
        {new Date(postData.publishedAt).toLocaleDateString()}
      </p>
      <p className="mb-8 text-sm text-gray-700">By {postData.author?.name}</p>

      <div className="space-y-4 text-base leading-7 text-gray-900">
        {postData.body.map(
          (block: { _key: string; children?: Array<{ text?: string }> }) => (
            <p key={block._key}>
              {Array.isArray(block.children)
                ? block.children.map((child) => child.text ?? "").join("")
                : ""}
            </p>
          ),
        )}
      </div>
    </main>
  );
}
