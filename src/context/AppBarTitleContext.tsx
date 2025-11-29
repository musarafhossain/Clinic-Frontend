'use client';
import { createContext, useContext, useState } from "react";

const AppBarTitleContext = createContext({
  title: "",
  setTitle: (title: string) => {}
});

export const AppBarTitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("");

  return (
    <AppBarTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </AppBarTitleContext.Provider>
  );
};

export const useAppBarTitle = () => useContext(AppBarTitleContext);
