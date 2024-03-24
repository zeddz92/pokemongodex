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
        "flex items-center  gap-2 w-full  flex-col md:flex-row py-1 sm:flex-nowrap overflow-x-auto",
        {
          "!hidden md:!flex": hiddenMobile,
        },
        className
      )}
    >
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
        {data.effective.map(({ id, val, key }) => (
          <div key={key} className="flex  items-center gap-1.5 flex-shrink-0">
            <span className="text-red-400 text-sm">{val}x</span>
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
      {data.notVeryEffective.length > 0 && (
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 justify-center">
          {data.notVeryEffective.map(({ id, val, key }) => (
            <div key={key} className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-green-400 text-sm">{val}x</span>
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
      )}
    </div>
  );
};
