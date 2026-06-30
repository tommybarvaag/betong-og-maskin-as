import { renderOgImage, OG_ALT, OG_SIZE, OG_CONTENT_TYPE } from "./_og/render";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function TwitterImage() {
  return renderOgImage();
}
