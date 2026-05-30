import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import Image from "next/image";
import { client } from "../src/sanity/client";
import { urlFor } from "../src/sanity/lib/image";
const POSTS_QUERY = `*[_type == "post"]`;
const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => {
          console.log(post);
          const imageUrl = post.image
            ? urlFor(post.image).width(1200).height(630).url()
            : null;

          return (
            <Link href={`/${post.slug.current}`} key={post._id}>
              <li className="hover:underline">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    loading="eager"
                    className="w-full h-auto object-cover rounded-lg mb-4 max-w-100"
                  />
                ) : null}
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                <p>Author : {post.author?.name}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
