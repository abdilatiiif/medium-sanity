import { type SanityDocument } from "next-sanity";

import { client } from "../sanity/client";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  author->{
    _id,
    name,
    image
  },
  body
}`;
const options = { next: { revalidate: 30 } };

async function getPostBySlug(slug: string) {
  return await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);
}

export { getPostBySlug };
