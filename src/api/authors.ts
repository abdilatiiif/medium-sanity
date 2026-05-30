import { type SanityDocument } from "next-sanity";

import { client } from "../sanity/client";

const AUTHORS_QUERY = `*[_type == "author"]`;
const options = { next: { revalidate: 30 } };

async function getAuthors() {
  return await client.fetch<SanityDocument[]>(AUTHORS_QUERY, {}, options);
}

export { getAuthors };
