"use client";

import { create } from "zustand";

interface SearchStore {
  searchText: string;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  setSearchText: (text: string) => void;
  resetSearchText: () => void;
}

export const useSearch = create<SearchStore>()((set) => ({
  searchText: "",
  isSearchOpen: false,

  toggleSearch: () =>
    set((state) => ({
      isSearchOpen: !state.isSearchOpen,
    })),

  setSearchText: (text) => set(() => ({ searchText: text })),

  resetSearchText: () => set({ searchText: "" }),
}));
