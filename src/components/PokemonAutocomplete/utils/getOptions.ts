import { PokemonProps } from "@/components/Pokemon";
import data from "@/data/pokedex.json";
import { Pokemon, Tier } from "@/types/Pokemon";

interface PokemonTier {
  id: number;
  name: string;
  pokemon: Pokemon[];
}

interface TierList {
  [league: string]: {
    id: number;
    key: string;
    name: string;
    maxCP: number;
    tiers: PokemonTier[];
  };
}

export const getOptions = () => {
  const list = (data as any[]).reduce(
    (acc: { [id: string]: any }, league: any) => {
      (league.tiers as any).forEach(({ pokemon }: any) => {
        pokemon.forEach((pokemonP: any) => {
          let id = `${pokemonP.id}`;
          if (pokemonP.isShadow) {
            id += "-s";
          }
          if (pokemonP.form) {
            id += pokemonP.form;
          }
          if (!acc[id]) {
            acc[id] = {
              ...pokemonP,
              tiers: {
                [league.id]: { maxCP: league.maxCP, rate: pokemonP.rate },
              } as Tier,
            };
          } else {
            acc[id].tiers![league.id] = {
              maxCP: league.maxCP,
              rate: pokemonP.rate,
            };
          }
        });
      });
      return acc;
    },
    {}
  );

  return Object.values(list) as any[];
};
