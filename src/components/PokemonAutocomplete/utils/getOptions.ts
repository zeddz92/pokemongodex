import { PokemonProps } from "@/components/Pokemon";
import data from "@/data/pokedex.json";
import { Pokemon, Tier } from "@/types/Pokemon";

export const getOptions = () => {
  const list = data.reduce((acc: { [id: string]: any }, val) => {
    val.tiers.forEach(({ pokemon }) => {
      pokemon.forEach((pokemonP) => {
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
            tiers: { [val.id]: pokemonP.rate } as Tier,
          };
        } else {
          acc[id].tiers![val.id] = pokemonP.rate;
        }
      });
    });
    return acc;
  }, {});

  return Object.values(list) as any[];
};
