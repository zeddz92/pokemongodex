"use client";
import React, { FC, createContext, useState, useContext } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import pokedex from "../data/pokedex.json";
import { PokemonImage } from "@/components/PokemonImage";
import { TypeChart } from "@/components/PokemonAutocomplete/components/TypeChart";
import { TierList } from "@/components/PokemonAutocomplete/components/TierList";
import Image from "next/image";
import { Pokemon } from "@/types/Pokemon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { I18nContext } from "./I18nContext";

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
    open: true,
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
        onClose={() => setState({ ...state, open: false })}
        onOpen={() => setState({ ...state, open: true })}
      >
        {state.data && (
          <div className="drawer-container">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
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
                  {/* <s pan className="text-xs text-gray-300">Max CP: 2500</s> */}
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
            </div>

            {state.data.evolutionaryLine.length > 0 && (
              <>
                <h2 className="drawer-title">
                  {dictionary.pokemon.evolutionaryLine}
                </h2>
                <div className="flex items-center justify-center gap-4  px-3">
                  {state.data.evolutionaryLine.map((p, i) => (
                    <>
                      <div key={p.key} className="flex flex-col items-center">
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
                      </div>
                      {i !== state.data!.evolutionaryLine.length - 1 && (
                        <ArrowForwardIcon />
                      )}
                    </>
                  ))}
                </div>
              </>
            )}

            <h2 className="drawer-title">{dictionary.pokemon.typeChart}</h2>
            <div className="border-y border-gray-500">
              <TypeChart data={state.data.typeChart} hiddenMobile={false} />
            </div>

            <h2 className="drawer-title">{dictionary.pokemon.tiers}</h2>
            <div className="">
              <TierList tiers={state.data!.tiers!} hiddenMobile={false} />
            </div>
          </div>
        )}
      </SwipeableDrawer>
    </DrawerContext.Provider>
  );
};
