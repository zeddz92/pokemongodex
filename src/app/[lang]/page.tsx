"use client";
import Image from "next/image";
// import data from "./data/pokemon.json";
import data from "@/data/pokedex.json";

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

import { I18nContext } from "@/contexts/I18nContext";

import { PokemonAutocomplete } from "@/components/PokemonAutocomplete/PokemonAutocomplete";
import Accordion from "@mui/material/Accordion";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Home() {
  const { dictionary } = useContext(I18nContext);

  return (
    <div className="flex flex-col p-4 md:px-24 md:py-16 text-white overflow-y-auto">
      <div className="">
        <PokemonAutocomplete onSelect={() => undefined} />
      </div>

      {/* <div className="mt-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-300">Tier List</h1>
      </div> */}

      <div className="mt-8 overflow-y-hidden h-full">
        {data
          .sort((a, b) => a.id - b.id)
          .map(({ id, name, tiers }) => (
            <Accordion
              key={`section-${name}`}
              slotProps={{ transition: { unmountOnExit: true } }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <div className="flex items-center justify-between w-full gap-3 sticky top-0 z-20 py-1 px-3 text-gray-400">
                  <div className="flex items-center gap-2.5">
                    <Image
                      // className="-rotate-180"
                      width={30}
                      height={30}
                      alt={name}
                      loading="lazy"
                      objectFit="scale-down"
                      src={`https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.2/league-icons/${id}.png`}
                    />
                    <h1 className="block text-gray-400 font-bold">{name}</h1>
                  </div>
                  {/* <span>
                    Max CP: <span className="font-bold">{maxCP}</span>
                  </span> */}
                </div>
              </AccordionSummary>
              <AccordionDetails sx={{ height: "60vh", overflowY: "auto" }}>
                <div className="flex flex-col gap-6 rounded">
                  {tiers.map(({ id, name, pokemon }) => (
                    <div key={`tier-${id}`}>
                      <div className="flex items-center justify-between font-bold text-lg md:text-xl text-gray-300 sticky top-0 z-20  bg-opacity-60 py-1 md:py-2 px-4 w-full rounded bg-zinc-800">
                        <h2>{name}</h2>
                        {/* <button
                          className="tier-section"
                          onClick={(e) => {
                            e.currentTarget
                            const next =
                              e.currentTarget.parentElement?.parentElement?.parentElement
                                ?.querySelector(`.tier-section`)
                                ?.scrollIntoView({ behavior: "smooth" });
                            console.log({
                              next,
                              el: e.currentTarget.parentElement?.parentElement
                                ?.parentElement,
                              id,
                            });
                          }}
                        >
                          <KeyboardArrowDownIcon />
                        </button> */}
                      </div>
                      <div className="mt-4 grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2.5 md:gap-5 flex-wrap justify-start">
                        {pokemon.map((p: any) => (
                          <Pokemon key={p.key} {...p} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
      {/* <SwipeableDrawer
        anchor="bottom"
        open={true}
        onClose={() => {}}
        onOpen={() => {}}
      >
        <div>Hellow</div>
      </SwipeableDrawer> */}
    </div>
  );
}
