import {
  PortableText as PT,
  type PortableTextComponents,
} from "@portabletext/react";
import type { BlockText } from "@/sanity/sanity.types";

// Matches the `blockText` schema (normal paragraphs + strong/em/code marks), styled for the
// about story on the dark theme: muted body, amber emphasis.
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-muted-foreground mb-5 text-[17px] leading-[1.75] last:mb-0">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-primary font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted rounded px-1.5 py-0.5 text-sm">{children}</code>
    ),
  },
};

export function PortableText({
  value,
}: {
  value: BlockText | null | undefined;
}) {
  if (!value || value.length === 0) return null;

  return <PT value={value} components={components} />;
}
