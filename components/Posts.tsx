import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import Image from "next/image";
import { client } from "../src/sanity/client";
import { urlFor } from "../src/sanity/lib/image";
const POSTS_QUERY = `*[
  _type == "post"
]|order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  image,
  author->{
    _id,
    name,
    image
  }
}`;
const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  if (!posts || posts.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">No posts found</h1>
        <p>
          It seems there are no posts available at the moment. Please check back
          later.
        </p>
      </main>
    );
  }
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => {
          const imageUrl = post.image
            ? urlFor(post.image).width(1200).height(630).url()
            : null;
          const authorImageUrl = post.author?.image
            ? urlFor(post.author.image).width(100).height(100).url()
            : null;

          return (
            <Link
              href={`/post/${encodeURIComponent(post.slug.current)}`}
              key={post._id}
              className="w-full max-w-sm"
            >
              <li className="w-full hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden bg-white">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    loading="eager"
                    className="w-full h-auto hover:scale-105 duration-300 transition-transform object-cover rounded-lg mb-4 max-w-100"
                  />
                ) : null}
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                  </div>

                  {authorImageUrl ? (
                    <Image
                      src={authorImageUrl}
                      alt={post.author?.name ?? "Author"}
                      width={40}
                      height={40}
                      loading="eager"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : null}
                  <p>By {post.author?.name}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
