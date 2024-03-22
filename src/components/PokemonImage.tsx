"use client";
import React, { FC } from "react";
import Image, { ImageProps } from "next/image";
import classNames from "classnames";

interface PokemonImageProps extends ImageProps {
  isShadow: boolean;
}

export const PokemonImage: FC<PokemonImageProps> = ({
  isShadow,
  width,
  height,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames("relative", className)}
      style={{ width: width, height: height }}
    >
      <Image
        {...props}
        fill
        alt={props.alt}
        style={{ objectFit: "scale-down" }}
        loading="lazy"
      />
      {isShadow && (
        <Image
          fill
          className="absolute inset-0 opacity-80"
          alt="shadow_background"
          loading="lazy"
          src="https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.0/shadow_background.png"
        />
      )}
    </div>
  );
};
