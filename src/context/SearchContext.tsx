"use client"
import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType>({
  searchKeyword: '',
  setSearchKeyword: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <SearchContext.Provider value={{ searchKeyword, setSearchKeyword }}>
      {children}
    </SearchContext.Provider>
  );
};