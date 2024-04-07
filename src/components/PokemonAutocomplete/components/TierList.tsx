import React, { FC } from "react";
import Image from "next/image";
import classNames from "classnames";
import { Tier } from "@/types/Pokemon";

interface TierListProps {
  tiers: Tier;
  formId?: string;
  className?: string;
  hiddenMobile?: boolean;
}
export const TierList: FC<TierListProps> = ({
  tiers,
  formId,
  className = "",
  hiddenMobile = true,
}) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-1.5 w-full md:w-fit justify-center",
        { "!hidden md:!flex": hiddenMobile },
        className
      )}
    >
      {Object.entries(tiers).map(([id, { rate, maxCP }]) => (
        <a
          href={`https://pvpoke.com/battle/multi/${maxCP}/all/${formId}/11/0-4-3/2-1/`}
          target="_blank"
          key={`tier-list-${id}-${rate}`}
          style={{ minWidth: 74 }}
          className={classNames(
            "flex items-center gap-0 justify-center rounded px-1.5 py-1 md:py-1.5 bg-opacity-20",
            {
              "bg-blue-500": id === "great_league",
              "bg-amber-300": id === "ultra_league",
              "bg-purple-500": id === "master_league",
              "bg-green-500": id === "attackers",
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
            src={`https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.5/league-icons/${id}.png`}
          />
          <span className="text-sm font-semibold text-gray-300 text-nowrap">
            {String(rate).replace("Tier", "")}
          </span>
        </a>
      ))}
    </div>
  );
};
