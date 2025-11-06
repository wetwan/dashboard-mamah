"use client"; // make sure this is a client component

import { create } from "zustand";

type Details = "open" | "close";

interface DetailsStore {
    details: Details;
    toggleDetails: () => void;
    setDetails: (details: Details) => void;
}

export const useDetails = create<DetailsStore>()(

    (set) => ({
        details: "close",
        toggleDetails: () =>
            set((state) => ({ details: state.details === "open" ? "close" : "open" })),
        setDetails: (details) => set({ details }),
    }),


);
