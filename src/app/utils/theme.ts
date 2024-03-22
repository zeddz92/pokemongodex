"use client";
import { DM_Sans as Font } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Font({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
//DM_Sans
