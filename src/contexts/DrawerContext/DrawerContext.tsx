"use client";
import React, { FC, createContext, useState, useContext } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import pokedex from "../../data/pokedex.json";
import { PokemonImage } from "@/components/PokemonImage";
import { TypeChart } from "@/components/PokemonAutocomplete/components/TypeChart";
import { TierList } from "@/components/PokemonAutocomplete/components/TierList";
import Image from "next/image";
import { Pokemon } from "@/types/Pokemon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { I18nContext } from "../I18nContext";
import { MoveSetTable } from "./components/MoveSetTable";

const beeDrill = {
  id: 15,
  key: "e04922f8-3de4-4008-9b82-1e849818187a",
  name: "Beedrill",
  moveSet: {
    pvp: [
      {
        quick: {
          moveSet: "Fire Spin",
          type: "fire",
        },
        charged: [
          {
            moveName: "Blast Burn*",
            type: "fire",
          },
          {
            moveName: "Dragon Claw",
            type: "dragon",
          },
        ],
        atk: "B",
      },
      {
        quick: {
          moveSet: "Wing Attack*",
          type: "flying",
        },
        charged: [
          {
            moveName: "Blast Burn*",
            type: "fire",
          },
          {
            moveName: "Dragon Claw",
            type: "dragon",
          },
        ],
        atk: "A",
      },
      {
        quick: {
          moveSet: "Dragon Breath*",
          type: "dragon",
        },
        charged: [
          {
            moveName: "Blast Burn*",
            type: "fire",
          },
          {
            moveName: "Dragon Claw",
            type: "dragon",
          },
        ],
        atk: "B",
      },
    ],
    pve: [
      {
        quick: {
          moveSet: "Fire Spin",
          type: "fire",
        },
        charged: [
          {
            moveName: "Blast Burn*",
            type: "fire",
          },
        ],
        atk: "B",
      },
    ],
  },
  names: {
    English: "Beedrill",
    German: "Bibor",
    French: "Dardargnan",
    Italian: "Beedrill",
    Japanese: "スピアー",
    Korean: "독침붕",
    Spanish: "Beedrill",
  },
  stats: {
    stamina: 163,
    attack: 169,
    defense: 130,
  },
  img: "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm15.icon.png",
  types: ["bug", "poison"],
  rate: 3,
  isShadow: false,
  typeChart: {
    notVeryEffective: [
      {
        id: "poison",
        val: 2,
        key: "08aeb0cc-4f67-482c-94fd-11b38b38cbfd",
      },
      {
        id: "bug",
        val: 2,
        key: "7b729e07-9a06-488d-b415-4911975cf9d0",
      },
      {
        id: "fairy",
        val: 2,
        key: "60ab7888-f3f5-4c2f-ae66-f674cbffcecf",
      },
      {
        id: "fighting",
        val: 4,
        key: "fc74c755-2829-42b3-a7d3-ec34b1b06e9c",
      },
      {
        id: "grass",
        val: 4,
        key: "e5502791-2b64-4bca-a4f1-6e53ea3a6720",
      },
    ],
    effective: [
      {
        id: "flying",
        val: 2,
        key: "c9ba2531-e5da-42dc-bd2d-4f2d16b7c957",
      },
      {
        id: "rock",
        val: 2,
        key: "f04254ba-55e5-4303-80af-fb10193dcec0",
      },
      {
        id: "fire",
        val: 2,
        key: "2c4ca8af-4456-40b7-bdb5-441a45879384",
      },
      {
        id: "psychic",
        val: 2,
        key: "abdca198-50ee-4dfe-8b14-6b641612dc47",
      },
    ],
  },
  evolutionaryLine: [
    {
      id: 13,
      key: "1eee394c-eafd-47dd-b34e-cecb2e7e13f4",
      name: "Weedle",
      names: {
        English: "Weedle",
        German: "Hornliu",
        French: "Aspicot",
        Italian: "Weedle",
        Japanese: "ビードル",
        Korean: "뿔충이",
        Spanish: "Weedle",
      },
      stats: {
        stamina: 120,
        attack: 63,
        defense: 50,
      },
      img: "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm13.icon.png",
      evolutionaryLine: [],
    },
    {
      id: 14,
      key: "c60c4176-1927-42c1-9731-ee8c8995c0d8",
      name: "Kakuna",
      names: {
        English: "Kakuna",
        German: "Kokuna",
        French: "Coconfort",
        Italian: "Kakuna",
        Japanese: "コクーン",
        Korean: "딱충이",
        Spanish: "Kakuna",
      },
      stats: {
        stamina: 128,
        attack: 46,
        defense: 75,
      },
      img: "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm14.icon.png",
      evolutionaryLine: [],
    },
  ],
  tiers: {
    "1": 3,
  },
};

interface ContextValues {
  openDrawer(_: Pokemon): void;
}

const defaultContextValues: ContextValues = {
  openDrawer: () => {},
};

export const DrawerContext = createContext(defaultContextValues);

export const DrawerContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { dictionary } = useContext(I18nContext);
  const [state, setState] = useState<{ open: boolean; data?: Pokemon }>({
    open: false,
    // data: beeDrill,
  });

  const openDrawer = (data: Pokemon) => {
    console.log(data);
    setState({
      data,
      open: true,
    });
  };

  return (
    <DrawerContext.Provider value={{ openDrawer }}>
      {children}

      <SwipeableDrawer
        anchor="bottom"
        open={state.open}
        onClose={() => setState({ ...state, data: undefined, open: false })}
        onOpen={() => setState({ ...state, open: true })}
      >
        {state.data && (
          <div className="drawer-container">
            <div className="drawer-indicator"></div>
            <a className="drawer-header" href={state.data.url} target="_blank">
              <div className="drawer-pokemon-title">
                <PokemonImage
                  alt={state.data.name}
                  isShadow={state.data.isShadow}
                  width={52}
                  height={52}
                  src={state.data.img}
                />
                <div className="flex flex-col ">
                  <h2 className="text-zinc-400 text-xl font-semibold">
                    {state.data.names[dictionary.locale]}
                  </h2>
                  <span className="drawer-max-cp">
                    Max CP: {state.data.maxCP}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {state.data.types.map((type, i) => (
                  <Image
                    key={`drawer-type-${type}-${i}`}
                    alt={type}
                    loading="lazy"
                    objectFit="scale-down"
                    width={26}
                    height={26}
                    src={`https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.2/type-icons/${type}.png`}
                  />
                ))}
              </div>
            </a>

            {state.data.evolutionaryLine.length > 0 && (
              <>
                <h2 className="drawer-title">
                  {dictionary.pokemon.evolutionaryLine}
                </h2>
                <div className="flex items-center justify-center gap-4 px-3">
                  {state.data.evolutionaryLine.map((p, i) => (
                    <>
                      <a
                        href={p.url}
                        target="_blank"
                        key={p.key}
                        className="flex flex-col items-center"
                      >
                        <PokemonImage
                          alt={p.names[dictionary.locale]}
                          title={p.names[dictionary.locale]}
                          width={32}
                          height={32}
                          src={p.img}
                          isShadow={state.data!.isShadow}
                        />
                        <span className="text-xs text-gray-300">
                          {p.names[dictionary.locale]}
                        </span>
                      </a>
                      {i !== state.data!.evolutionaryLine.length - 1 && (
                        <ArrowForwardIcon color="disabled" />
                      )}
                    </>
                  ))}
                </div>
              </>
            )}
            <h2 className="drawer-title">{dictionary.pokemon.tiers}</h2>
            <div className="">
              <TierList
                formId={state.data.formId.toLowerCase()}
                tiers={state.data!.tiers!}
                hiddenMobile={false}
              />
            </div>
            <h2 className="drawer-title">{dictionary.pokemon.typeChart}</h2>
            <div className="px-4">
              <TypeChart data={state.data.typeChart} hiddenMobile={false} />
            </div>

            {!!state.data?.moveSet.pve.length && (
              <MoveSetTable title="PVE MoveSet" data={state.data.moveSet.pve} />
            )}
            {!!state.data?.moveSet.pvp.length && (
              <MoveSetTable title="PVP MoveSet" data={state.data.moveSet.pvp} />
            )}
          </div>
        )}
      </SwipeableDrawer>
    </DrawerContext.Provider>
  );
};
