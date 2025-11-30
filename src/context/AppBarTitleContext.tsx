'use client';
import { createContext, useContext, useState } from 'react';

type AppBarContextType = {
  title: string;
  backTo: string | null;
  setTitle: (title: string) => void;
  setBackTo: (value: string | null) => void;
  resetTitleBar: () => void;
  setTitleBar: (title: string, backTo?: string | null) => void;
};

const AppBarTitleContext = createContext<AppBarContextType>({
  title: '',
  backTo: null,
  setTitle: () => { },
  setBackTo: () => { },
  resetTitleBar: () => { },
  setTitleBar: () => { },
});

export const AppBarTitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState('Phyzo');
  const [backTo, setBackTo] = useState<string | null>(null);

  const resetTitleBar = () => {
    setTitleBar('Phyzo', null);
  };

  const setTitleBar = (
    newTitle: string,
    newBackTo: string | null = null
  ) => {
    setTitle(newTitle);
    setBackTo(newBackTo);
    document.title = newTitle;
  };


  return (
    <AppBarTitleContext.Provider
      value={{ title, backTo, setTitle, setBackTo, resetTitleBar, setTitleBar }}
    >
      {children}
    </AppBarTitleContext.Provider>
  );
};

export const useAppBarTitle = () => useContext(AppBarTitleContext);
