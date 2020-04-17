import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { imageBuilder } from "../lib/sanity/api";

const useStyles = makeStyles(theme => ({
  image: {
    width: "100%",
    height: "auto"
  }
}));

export default function Image({
  className,
  image,
  alt,
  width = 600,
  height = null,
  phoneWidth = 600,
  phoneHeight = null,
  quality = 90,
  fit = "max"
}) {
  const classes = useStyles();

  const imageUrl =
    fit === "crop" && image?.hotspot !== null && image?.hotspot !== undefined
      ? imageBuilder
          .image(image?.asset)
          .width(width)
          .height(height ? height : Math.floor((9 / 16) * width))
          .quality(quality)
          .fit(fit)
          .crop("focalpoint")
          .focalPoint(image?.hotspot?.x, image?.hotspot?.y)
          .auto("format")
          .url()
      : imageBuilder
          .image(image?.asset)
          .width(width)
          .height(height ? height : Math.floor((9 / 16) * width))
          .quality(quality)
          .fit(fit)
          .auto("format")
          .url();

  const phoneImageUrl =
    fit === "crop" && image?.hotspot !== null && image?.hotspot !== undefined
      ? imageBuilder
          .image(image?.asset)
          .width(phoneWidth)
          .height(phoneHeight ? phoneHeight : Math.floor((9 / 16) * phoneWidth))
          .quality(quality)
          .fit(fit)
          .crop("focalpoint")
          .focalPoint(image?.hotspot?.x, image?.hotspot?.y)
          .auto("format")
          .url()
      : imageBuilder
          .image(image?.asset)
          .width(phoneWidth)
          .height(phoneHeight ? phoneHeight : Math.floor((9 / 16) * phoneWidth))
          .quality(quality)
          .fit(fit)
          .auto("format")
          .url();

  return (
    <picture>
      <source media="(max-width: 599px)" srcSet={phoneImageUrl} />
      <source media="(min-width: 600px)" srcSet={imageUrl} />
      <img
        className={clsx(classes.image, className)}
        src={imageUrl}
        alt={alt ?? image?.alt ?? "Missing alt"}
      />
    </picture>
  );
}
