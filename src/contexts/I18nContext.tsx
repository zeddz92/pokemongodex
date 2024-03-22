"use client";
import dictionary from "../../dictionaries/en.json";

import React, { FC, createContext } from "react";

export type Dictionary = typeof dictionary;

interface ContextValues {
  dictionary: typeof dictionary;
}

const defaultContextValues: ContextValues = {
  dictionary: dictionary,
};

export const I18nContext = createContext(defaultContextValues);

export const I18nContextProvider: FC<{
  children: React.ReactNode;
  dictionary: any;
}> = ({ children, dictionary }) => {
  return (
    <I18nContext.Provider value={{ dictionary }}>
      {children}
    </I18nContext.Provider>
  );
};
