import { PokemonImage } from "@/components/PokemonImage";
import { Dictionary, I18nContext } from "@/contexts/I18nContext";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListSubheader,
  Box,
  ListItemButton,
  ListItemText,
  Popper,
} from "@mui/material";
import classNames from "classnames";
import React, { useState, useContext, useEffect } from "react";
import { ListChildComponentProps } from "react-window";
import { LISTBOX_PADDING } from "./ListBoxComponent";
import { PokemonProps } from "@/components/Pokemon";
import { TierList } from "./TierList";
import { TypeChart } from "./TypeChart";
import { BroadcastChannel } from "broadcast-channel";
import { v4 as uuid } from "uuid";

import Image from "next/image";
import { Pokemon } from "@/types/Pokemon";

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

  useEffect(() => {
    new BroadcastChannel("action-click-event").onmessage = (data) => {
      // if (!!anchorEl && data !== option.id) {
      //   console.log("Closing?", data);
      //   setAnchorEl(null);
      // }
      if (anchor.el && data !== option.name) {
        setAnchor({});
      }
    };
  }, [anchor.el, option]);

  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    type: PopperType
  ) => {
    event.preventDefault();
    event.stopPropagation();
    // setAnchorEl(anchorEl ? null : event.currentTarget);

    setAnchor({
      el: type == anchor.type ? undefined : event.currentTarget,
      type: type == anchor.type ? undefined : type,
    });
    new BroadcastChannel("action-click-event").postMessage(option.name);
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
              {option.isShadow ? dictionary.pokemon.shadow : ""}{" "}
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
        <div className="flex md:hidden gap-4">
          <ListItemButton
            onClick={(e) => {
              handleClick(e, PopperType.Types);
            }}
            disableGutters
            className="text-gray-800 flex items-center"
          >
            <Image
              alt="type"
              width={24}
              height={24}
              loading="lazy"
              src="https://github.com/PokeMiners/pogo_assets/blob/master/Images/Badges/Achievements/Badge_37_1_01.png?raw=true"
            />
          </ListItemButton>
          <ListItemButton
            disableGutters
            onClick={(e) => handleClick(e, PopperType.Ratings)}
            className="text-gray-800 flex items-center"
          >
            <Image
              alt="league"
              width={24}
              height={24}
              loading="lazy"
              src="https://github.com/PokeMiners/pogo_assets/blob/master/Images/Buddy/ic_buddy_battleColor.png?raw=true"
            />
          </ListItemButton>
        </div>
        <TierList tiers={option.tiers!} />
      </div>
      <Popper
        disablePortal
        open={anchor.type === "ratings"}
        anchorEl={anchor.el}
        sx={{ zIndex: 99999 }}
        className="bg-gray-900 z-50 w-full p-2"
      >
        <TierList hiddenMobile={false} tiers={option.tiers!} />
      </Popper>

      <Popper
        disablePortal
        open={anchor.type === "types"}
        anchorEl={anchor.el}
        sx={{ zIndex: 99999 }}
        className="bg-gray-900 z-50 w-full p-2"
      >
        <TypeChart hiddenMobile={false} data={option.typeChart} />
      </Popper>
    </Box>
  );
};
