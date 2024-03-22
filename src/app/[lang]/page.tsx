"use client";
import Image from "next/image";
// import data from "./data/pokemon.json";
import data from "@/data/pvp_tier_pokemons.json";

import { Pokemon, PokemonProps } from "../../components/Pokemon";

import TextField from "@mui/material/TextField";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";

import {
  Box,
  Grow,
  InputAdornment,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  useCallback,
  useMemo,
  useContext,
  forwardRef,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import { useTheme, styled } from "@mui/material/styles";
import { PokemonImage } from "../../components/PokemonImage";
import classNames from "classnames";
import { Dictionary, I18nContext } from "@/contexts/I18nContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import List from "@mui/material/List";
import { PokemonAutocomplete } from "@/components/PokemonAutocomplete/PokemonAutocomplete";

export default function Home() {
  const { dictionary } = useContext(I18nContext);

  console.log("wassup", dictionary);
  return (
    <div className="flex flex-col p-4 md:px-24 md:py-16 text-white overflow-y-auto">
      <div className="">
        <PokemonAutocomplete onSelect={() => undefined} />
      </div>

      <div className="mt-4 overflow-y-auto h-full">
        {/* {data
          .sort((a, b) => a.id - b.id)
          .map(({ name, tiers }) => (
            <section key={`section-${name}`}>
              <div className="flex items-center justify-center gap-3 sticky top-0 z-20 bg-black shadow-lg py-2 px-4">
                <Image
                  // className="-rotate-180"
                  width={30}
                  height={30}
                  alt={name}
                  loading="lazy"
                  objectFit="scale-down"
                  src={"/great-league-pogo.png"}
                />
                <h1 className="block text-gray-300 text-2xl font-bold">
                  {name}
                </h1>
              </div>
              <div className="flex flex-col gap-6 rounded">
                {tiers.map(({ id, name, pokemon }) => (
                  <div key={`tier-${id}`}>
                    <h2 className="font-bold text-xl text-gray-300 sticky top-0 z-20 bg-black bg-opacity-60 shadow-lg w-max py-2 px-4 ">
                      {name}
                    </h2>
                    <div className="mt-4 grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-5 flex-wrap justify-start">
                      {pokemon.map((p) => (
                        <Pokemon key={`${name}-${p.name}`} {...p} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))} */}
      </div>
    </div>
  );
}
