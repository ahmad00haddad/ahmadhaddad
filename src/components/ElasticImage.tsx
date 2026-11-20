import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ElasticImageProps = ImgHTMLAttributes<HTMLImageElement>;

/** Replays a tiny settle only when a new image source finishes loading. */
export function ElasticImage({ className, onLoad, src, ...props }: ElasticImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<ImgHTMLAttributes<HTMLImageElement>["src"]>(null);
  const loaded = loadedSrc === src;

  return (
    <img
      {...props}
      src={src}
      onLoad={(event) => {
        setLoadedSrc(src ?? null);
        onLoad?.(event);
      }}
      className={cn(loaded && "img-settle", className)}
    />
  );
}
