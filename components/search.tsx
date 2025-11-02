"use client";

import { useSearch } from "@/src/store/searchStore";
import { SearchIcon, X } from "lucide-react";
import React from "react";

const Search = () => {
  const {
    searchText,
    isSearchOpen,
    toggleSearch,
    setSearchText,
    resetSearchText,
  } = useSearch();

  return (
    <div
      className={`
        border h-12 rounded-3xl flex items-center gap-2 px-3 transition-all
        w-full max-w-lg
        ${isSearchOpen ? "flex" : "hidden"}   /* hide on small unless opened */
        lg:flex                                     /* always show on large screens */
      `}
    >
      <input
        className="flex-1 px-5 h-full outline-none"
        placeholder="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText && <X onClick={resetSearchText} size={17} />}
      <SearchIcon className="mx-5" size={17} />
    </div>
  );
};

export default Search;
