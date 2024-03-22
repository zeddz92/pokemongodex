import classNames from "classnames";
import Image from "next/image";
import React, { FC } from "react";
import { TypeChart as SW } from "../../../types/Pokemon";

interface TypeChartProps {
  data: SW;
  className?: string;
  hiddenMobile?: boolean;
}

export const TypeChart: FC<TypeChartProps> = ({
  data,
  hiddenMobile = true,
  className = "",
}) => {
  return (
    <div
      className={classNames(
        "flex items-end gap-2 w-full justify-end flex-col md:flex-row py-1 sm:flex-nowrap overflow-x-auto",
        {
          "!hidden md:!flex": hiddenMobile,
        },
        className
      )}
    >
      <div className="flex items-center gap-2">
        {data.effective.map(({ id, val, key }) => (
          <div
            key={key}
            className="flex items-center gap-1.5 flex flex-shrink-0"
          >
            <span
              className={classNames(" text-sm", {
                "text-green-400": val < 0,
                "text-red-400": val > 0,
              })}
            >
              {val}x
            </span>
            <Image
              alt={id}
              title={id}
              src={`https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.0/type-icons/${id}.png`}
              width={20}
              height={20}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 justify-end">
        {data.notVeryEffective.map(({ id, val, key }) => (
          <div
            key={key}
            className="flex items-center gap-1.5 flex flex-shrink-0"
          >
            <span
              className={classNames(" text-sm", {
                "text-green-400": val < 0,
                "text-red-400": val > 0,
              })}
            >
              {val}x
            </span>
            <Image
              alt={id}
              title={id}
              src={`https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.0/type-icons/${id}.png`}
              width={20}
              height={20}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
