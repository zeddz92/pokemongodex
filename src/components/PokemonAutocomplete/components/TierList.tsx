import React, { FC } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Tier } from "@/types/Pokemon";

interface TierListProps {
  tiers: Tier;
  className?: string;
  hiddenMobile?: boolean;
}
export const TierList: FC<TierListProps> = ({
  tiers,
  className = "",
  hiddenMobile = true,
}) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-1.5 w-full md:w-fit justify-end",
        { "!hidden md:!flex": hiddenMobile },
        className
      )}
    >
      {Object.entries(tiers).map(([id, rate]) => (
        <div
          key={`tier-list-${id}-${rate}`}
          style={{ minWidth: 74 }}
          className={classNames(
            "flex items-center gap-0 justify-center rounded px-1.5 py-1 md:py-1.5 bg-opacity-20",
            {
              "bg-blue-500": id === "1",
              "bg-amber-300": id === "2",
              "bg-purple-500": id === "3",
              "bg-green-500": id === "4",
            }
          )}
        >
          <Image
            className="mr-2"
            loading="lazy"
            quality={10}
            objectFit="scale-down"
            width={16}
            height={16}
            alt=""
            src={`https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.2/league-icons/${id}.png`}
          />
          <span className="text-sm font-semibold text-gray-300 text-nowrap">
            {String(rate).replace("Tier", "")}
          </span>
        </div>
      ))}
    </div>
  );
};
