"use client";
import Image from "next/image";
import React, { FC, useContext } from "react";
import { PokemonStatus } from "./PokemonStatus";
import { PokemonImage } from "./PokemonImage";
import { Pokemon as PokemonT } from "../types/Pokemon";
import { I18nContext } from "@/contexts/I18nContext";

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

export const Pokemon: FC<PokemonT> = ({
  name,
  names,
  img,
  types,
  evolutionaryLine,
  isShadow,
  rate,
}) => {
  const { dictionary } = useContext(I18nContext);
  return (
    <div className="relative flex flex-col items-center gap-3 bg-slate-900 rounded py-3 bg-opacity-60 ">
      <div className="absolute left-0 bottom-0 m-2">
        {/* <PokemonStatus atk={2} def={15} hp={15} /> */}
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
            <PokemonImage
              width={32}
              height={32}
              alt={pk.name}
              isShadow={isShadow}
              loading="lazy"
              src={pk.img}
            />
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
        <div className="flex flex-col items-center gap-3">
          <PokemonImage
            alt={name}
            isShadow={isShadow}
            loading="lazy"
            width={90}
            height={90}
            src={img}
          />
          <span className="text-gray-300 text-sm font-semibold shadow">
            {isShadow && dictionary.pokemon.shadow} {names[dictionary.locale]}
          </span>
        </div>
      </div>
    </div>
  );
};
