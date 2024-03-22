import pokedex from "@/data/pokedex.json";
export type TypeChart = {
  effective: { id: string; val: number; key: string }[];
  notVeryEffective: { id: string; val: number; key: string }[];
};

export type Tier = { [id: string]: number };

export interface Pokemon {
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
  evolutionaryLine: Pokemon[];
  tiers?: Tier;
  typeChart: TypeChart;
}
