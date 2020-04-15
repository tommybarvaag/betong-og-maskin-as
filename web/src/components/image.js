import { imageBuilder } from "../lib/sanity/api";

export default function Image({ url, alt }) {
  return (
    <img
      alt={alt}
      src={imageBuilder
        .image(url)
        .width(600)
        .height(Math.floor((9 / 16) * 600))
        .url()}
    />
  );
}
