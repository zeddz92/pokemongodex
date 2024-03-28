"use client";
import React, { FC, useContext } from "react";
import Image from "next/image";
import { I18nContext } from "@/contexts/I18nContext";
import { MoveSet } from "@/types/Pokemon";
import MobileStepper from "@mui/material/MobileStepper";
import Box from "@mui/material/Box";
//@ts-ignore
import SwipeableViews from "react-swipeable-views-react-18-fix";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material/styles";

type MoveSetTableProps = {
  title: string;
  data: MoveSet[];
};

export const MoveSetTable: FC<MoveSetTableProps> = ({ title, data }) => {
  const theme = useTheme();

  const { dictionary } = useContext(I18nContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = data.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <>
      <h2 className="drawer-title">{title}</h2>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        ignoreNativeScroll
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {data.map((move, index) => (
          <div key={`stepper-${index}`} className="drawer-move-set select-none">
            <table className="w-full text-sm">
              <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                <tr>
                  <th className="w-45p"></th>
                  <th className="w-45p"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center gap-2">
                      <Image
                        alt={"p.names[dictionary.locale]"}
                        title={"p.names[dictionary.locale]"}
                        width={16}
                        height={16}
                        src={`https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.2/type-icons/${move.quick.type.names[
                          "English"
                        ].toLowerCase()}.png`}
                      />
                      <span>{move.quick.names[dictionary.locale]}</span>
                    </div>
                  </td>
                  <td>
                    <div className="move-set-charged">
                      {move.charged.map((move, index) => (
                        <div
                          className="flex items-center gap-2"
                          key={`charged-move-${move.name}-${index}`}
                        >
                          <Image
                            alt={"p.names[dictionary.locale]"}
                            title={"p.names[dictionary.locale]"}
                            width={16}
                            height={16}
                            src={`https://cdn.jsdelivr.net/npm/pokemon-assets@1.0.2/type-icons/${move.type.names[
                              "English"
                            ].toLowerCase()}.png`}
                          />
                          <span className="move-name">
                            {move.names[dictionary.locale]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="move-set-rate">
                    <span>{move.atk}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </SwipeableViews>
      {maxSteps > 1 && (
        <MobileStepper
          steps={maxSteps}
          sx={{
            padding: 0,
            background: "transparent",
            justifyContent: "center",
          }}
          position="static"
          activeStep={activeStep}
          nextButton={null}
          backButton={null}
        />
      )}
    </>
  );
};
