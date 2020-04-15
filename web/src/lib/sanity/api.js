import sanityImage from "@sanity/image-url";
import client, { previewClient } from "./sanityClient";

const getUniquePosts = posts => {
  const slugs = new Set();
  return posts.filter(post => {
    if (slugs.has(post.slug)) {
      return false;
    } else {
      slugs.add(post.slug);
      return true;
    }
  });
};

const postFields = `
  name,
  title,
  publishedAt,
  excerpt,
  'slug': slug.current,
  'mainImage': mainImage,
  'author': author -> {name, 'picture': picture.asset->url}
`;

const getClient = preview => (preview ? previewClient : client);

export const imageBuilder = sanityImage(client);

export async function getHome(preview = false) {
  const data = await getClient(preview).fetch(`{
      "settings": *[_type == "siteSettings"]{
      description,
      keywords
    }|[0],
      "info": *[_type == "companyInfo"]{
        name,
        address1,
        city,
        country,
        email,
        name,
        phone,
        zipCode
      }|[0],
      "services": *[_type == "service"]{
        title,
        text,
        slug {
        current
      },
        mainImage {
          asset,
          alt
        },
        categories
      },
      "page": *[_id == "home"]{
        title,
        image {
          asset,
          alt
        },
      text,
      enableContactForm
      }|[0]
    }`);

  return data;
}

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(publishedAt desc){
      ${postFields}
      content
    }`,
    { slug }
  );
  return data[0];
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`);
  return data;
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(publishedAt desc, _updatedAt desc){
      ${postFields}
    }`);
  return getUniquePosts(results);
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview);
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
      }`,
        { slug }
      )
      .then(res => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc){
        ${postFields}
      }[0...2]`,
      { slug }
    )
  ]);
  return { post, morePosts: getUniquePosts(morePosts) };
}
