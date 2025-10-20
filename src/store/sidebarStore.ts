"use client"; // make sure this is a client component

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SideBar = "open" | "close";

interface SideBarStore {
    sideBar: SideBar;
    toggleSideBar: () => void;
    setSideBar: (sideBar: SideBar) => void;
}

export const useSideBar = create<SideBarStore>()(
    persist(
        (set) => ({
            sideBar: "close",
            toggleSideBar: () =>
                set((state) => ({ sideBar: state.sideBar === "open" ? "close" : "open" })),
            setSideBar: (sideBar) => set({ sideBar }),
        }),
        {
            name: "sideBar-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
