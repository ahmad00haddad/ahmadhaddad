import type { ImgHTMLAttributes } from "react";

type ElasticImageProps = ImgHTMLAttributes<HTMLImageElement>;

/** Kept as a shared image primitive; loading no longer triggers a bounce. */
export function ElasticImage(props: ElasticImageProps) {
  return <img {...props} />;
}
