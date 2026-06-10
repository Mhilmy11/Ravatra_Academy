export default function LazyImage({ src, alt, className, width, height }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      className={className}
    />
  );
}
