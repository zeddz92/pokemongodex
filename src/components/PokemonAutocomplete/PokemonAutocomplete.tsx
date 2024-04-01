import Autocomplete, {
  AutocompleteRenderInputParams,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { FC, useCallback, useContext, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import {
  FilterOptionsState,
  Popper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ListboxComponent from "./components/ListBoxComponent";
import { PokemonProps } from "../Pokemon";
import { I18nContext } from "@/contexts/I18nContext";
import { getOptions } from "./utils/getOptions";
import { DrawerContext } from "@/contexts/DrawerContext";

type PokemonAutocompleteProps = {
  onSelect(pokemon: PokemonProps): void;
};

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export const PokemonAutocomplete: FC<PokemonAutocompleteProps> = () => {
  const { dictionary } = useContext(I18nContext);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });

  const getOptionLabel = useCallback(
    ({ names }: PokemonProps) => names[dictionary.locale],
    [dictionary.locale]
  );

  const options = useMemo(() => getOptions(), []);

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        placeholder="Search"
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="disabled" />
            </InputAdornment>
          ),
        }}
      />
    ),
    []
  );
  const { openDrawer } = useContext(DrawerContext);

  const filterOptions = useCallback(
    (options: PokemonProps[], state: FilterOptionsState<PokemonProps>) => {
      const search = state.inputValue.toLocaleLowerCase().trim();

      return options.filter(
        (option) =>
          option.names[dictionary.locale]
            .toLocaleLowerCase()
            .trim()
            .includes(search) ||
          option.evolutionaryLine.some((p) =>
            p.names[dictionary.locale]
              .toLocaleLowerCase()
              .trim()
              .includes(search)
          )
      );
    },
    [dictionary.locale]
  );

  return (
    <Autocomplete
      id="pokemon-autocomplete"
      fullWidth
      openOnFocus
      clearOnBlur={false}
      clearOnEscape={false}
      size="small"
      selectOnFocus={true}
      onFocus={(e) => {
        e.currentTarget.querySelector("input")?.select();
      }}
      onChange={(e, data) => {
        if (data && !smUp) {
          openDrawer(data as any);
        }
      }}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      getOptionLabel={getOptionLabel}
      options={options}
      filterOptions={filterOptions}
      renderInput={renderInput}
      renderOption={(props, option, state) =>
        [props, option, state.index] as React.ReactNode
      }
      renderGroup={(params) => params as any}
    />
  );
};
