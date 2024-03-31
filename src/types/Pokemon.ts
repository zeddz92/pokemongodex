import pokedex from "@/data/pokedex.json";

export type TypeChart = {
  effective: { id: string; val: number; key: string }[];
  notVeryEffective: { id: string; val: number; key: string }[];
};

export type Languages = { [lang: string]: string };
export type Tier = { [id: string]: number | string };
export type Type = { type: string; names: Languages };
export type Move = {
  name: string;
  names: Languages;
  img: string;
  type: Type;
  key: string;
  isElite: boolean;
};

export type MoveSet = {
  quick: Move;
  charged: Move[];
  atk: string;
};

export interface Pokemon {
  id: number;
  key: string;
  name: string;
  names: Languages;
  tiers: Tier;
  stats: {
    stamina: number;
    attack: number;
    defense: number;
  };
  evolutionaryLine: Pokemon[];
  img: string;
  types: string[];
  rate: number | string;
  isShadow: boolean;
  typeChart: TypeChart;
  moveSet: {
    pvp: MoveSet[];
    pve: MoveSet[];
  };
}
