import classNames from "classnames";
import React, { FC } from "react";

type PokemonStatusProps = {
  atk: number;
  def: number;
  hp: number;
};

const Status: FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative rounded-full h-1.5 xl:h-1 md:h-2 bg-gray-500 w-16 md:w-24 xl:w-16 flex justify-evenly items-center">
        <div className="status-separator" />
        <div className="status-separator" />
        <div
          className={classNames("absolute inset-0 rounded", {
            "bg-orange-500": value !== 15,
            "bg-red-500": value === 15,
          })}
          style={{ width: `${(value * 100) / 15}%` }}
        />
      </div>
      <span className="text-xs text-gray-400">{value}</span>
    </div>
  );
};

export const PokemonStatus: FC<PokemonStatusProps> = () => {
  return (
    <div className="flex flex-col gap-1 xl:gap-0">
      <Status value={14} />
      <Status value={15} />
      <Status value={12} />
    </div>
  );
};
