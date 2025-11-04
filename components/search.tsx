"use client";

import { useSearch } from "@/src/store/searchStore";
import { SearchIcon, X } from "lucide-react";
import React from "react";

const Search = () => {
  const { searchText, isSearchOpen, setSearchText, resetSearchText } =
    useSearch();

  return (
    <div
      className={`
        border h-12 rounded-3xl flex items-center gap-2 px-3 transition-all
        w-full lg:flex
        ${isSearchOpen ? "flex" : "hidden"}   
                            
      `}
    >
      <input
        className="flex-1  h-full outline-none py-2"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText && <X onClick={resetSearchText} size={17} />}
      <SearchIcon className="mx-3" size={17} />
    </div>
  );
};

export default Search;
