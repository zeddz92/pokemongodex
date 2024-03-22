"use client";
import Image from "next/image";
import React, { FC } from "react";
import { PokemonStatus } from "./PokemonStatus";

export type PokemonProps = {
  name: string;
  key: string;
  form?: string;
  stats: {
    attack: number;
    defense: number;
    stamina: number;
  };
  names: { [lang: string]: string };
  types: string[];
  img: string;
  isShadow: boolean;
  rate: number;
  evolutionaryLine: PokemonProps[];
  parent?: PokemonProps;
  tiers?: { id: string; rate: number }[];
  typeChart: {
    effective: { id: string; val: number; key: string }[];
    notVeryEffective: { id: string; val: number; key: string }[];
  };
};

export const Pokemon: FC<PokemonProps> = ({
  name,
  names,
  img,
  types,
  evolutionaryLine,
  isShadow,
  rate,
}) => {
  return (
    <div className="relative flex flex-col items-center gap-3 bg-gray-800 rounded py-3 bg-opacity-60 ">
      {/* <Image
        fill
        className="absolute inset-0 opacity-65"
        alt="shadow_background"
        loading="lazy"
        
        src={`/types/${types[0]}.png`}
      /> */}

      <div className="absolute left-0 bottom-0 m-2">
        <PokemonStatus atk={2} def={15} hp={15} />
      </div>
      <div className="rate absolute top-0 left-0 bg-gray-800 py-2 px-4 m-1.5 rounded text-gray-300 font-semibold">
        <span className="text-sm">{rate}</span>
      </div>
      <div className="evolutionary-line absolute right-0 top-0 flex flex-col gap-1 p-1.5">
        {evolutionaryLine.map((pk) => (
          <div
            title={pk.name}
            key={`evol-line-${pk.name}`}
            className="rounded bg-gray-800 bg-opacity-55 p-2"
          >
            <div className="relative w-10 h-10">
              <Image
                fill
                alt={pk.name}
                loading="lazy"
                objectFit="scale-down"
                src={pk.img}
              />
              {isShadow && (
                <Image
                  fill
                  className="absolute inset-0 opacity-65"
                  alt="shadow_background"
                  loading="lazy"
                  src="https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.0/shadow_background.png"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-2">
          {types.map((type, i) => (
            <Image
              key={`${name}-type-${type}-${i}`}
              alt={type}
              loading="lazy"
              objectFit="scale-down"
              width={38}
              height={38}
              src={`https://www.serebii.net/pokedex-bw/type/${type}.gif`}
            />
          ))}
        </div>
        <div className="relative w-32 h-32">
          <Image
            fill
            alt={name}
            // className="w-32 h-32"
            loading="lazy"
            objectFit="scale-down"
            // width={124}
            // height={124}
            src={img}
          />
          {isShadow && (
            <Image
              fill
              className="absolute inset-0 opacity-80"
              alt="shadow_background"
              loading="lazy"
              src="/shadow_background.png"
            />
          )}
        </div>

        <div className="w-full flex">
          <span className="text-gray-300 text-sm font-semibold shadow">
            {isShadow && "Shadow"} {names["English"]}
          </span>
          <div className="align">link</div>
        </div>
      </div>
    </div>
  );
};
