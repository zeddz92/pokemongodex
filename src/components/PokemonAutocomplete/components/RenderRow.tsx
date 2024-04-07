import { PokemonProps } from "@/components/Pokemon";
import { PokemonImage } from "@/components/PokemonImage";
import { I18nContext } from "@/contexts/I18nContext";
import { Pokemon } from "@/types/Pokemon";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ListChildComponentProps } from "react-window";

import { LISTBOX_PADDING } from "./ListBoxComponent";
import { TierList } from "./TierList";
import { TypeChart } from "./TypeChart";

// const bc = new BroadcastChannel("action-click-event");
enum PopperType {
  Types = "types",
  Ratings = "ratings",
}

export const RenderRow = (
  props: ListChildComponentProps<[any, PokemonProps]>
) => {
  const [anchor, setAnchor] = useState<{
    el?: HTMLElement;
    type?: PopperType;
  }>({});

  const { dictionary } = useContext(I18nContext);
  const { data, index, style } = props;

  const dataSet = data[index];

  const option = dataSet[1] as Pokemon;

  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  return (
    <Box component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 overflow-x-hidden">
          <div className="flex items-center gap-3">
            <PokemonImage
              quality={10}
              width={38}
              height={38}
              isShadow={option.isShadow}
              src={option.img}
              alt={option.names[dictionary.locale]}
            />
            <span className="text-gray-300 text-lg  text-nowrap">
              {option.names[dictionary.locale]}
            </span>
          </div>
          {option.evolutionaryLine.length > 0 && (
            <div className="hidden md:flex items-center gap-2 border-x border-slate-600 rounded px-3">
              {option.evolutionaryLine.map((p, i) => (
                <PokemonImage
                  alt={p.names[dictionary.locale]}
                  title={p.names[dictionary.locale]}
                  key={p.key}
                  width={20}
                  height={20}
                  src={p.img}
                  isShadow={option.isShadow}
                />
              ))}
            </div>
          )}
          <TypeChart data={option.typeChart} className="mr-4" />
        </div>

        <TierList tiers={option.tiers!} />
      </div>
    </Box>
  );
};
