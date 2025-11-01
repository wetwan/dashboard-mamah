"use client";

import React from "react";

import { Zap } from "lucide-react";
import { useTheme } from "@/src/store/themeStore";
import { getThemeColors } from "@/src/hook/theme";

// --- Helper Components ---

// interface ColorCardProps {
//   title: string;
//   bgClass: string;
//   textClass: string;
//   radiusClass: string;
// }

// const ColorCard: React.FC<ColorCardProps> = ({
//   title,
//   bgClass,
//   textClass,
//   radiusClass,
// }) => (
//   <div
//     className={`p-6 ${bgClass} ${textClass} ${radiusClass} shadow-md flex flex-col items-center justify-center min-h-[120px] transition-colors duration-500`}
//   >
//     <p className="text-xl font-bold">{title}</p>
//     <p className="text-sm opacity-80 mt-1">{radiusClass}</p>
//   </div>
// );

// interface ChartSwatchProps {
//   index: number;
// }

// const ChartSwatch: React.FC<ChartSwatchProps> = ({ index }) => (
//   <div
//     className={`w-full h-8 bg-chart-${index} rounded-sm transition-colors duration-500`}
//   ></div>
// );

// --- Main Component ---

const DashBoard: React.FC = () => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  return (
    <div className="min-h-screen p-4 sm:p-8  text-foreground transition-colors duration-500 font-sans border bg-amber-300 dark:bg-amber-950">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex justify-between items-center pb-4 border-b border-border/50">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center">
            <Zap className="w-8 h-8 mr-2 text-secondary" />
          </h1>
        </header>

        {/* Core UI Palette */}
        {/* <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-l-4 border-primary pl-3">
            Core UI Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorCard
              title="Primary"
              bgClass="bg-primary"
              textClass="text-primary-foreground"
              radiusClass="rounded-lg"
            />
            <ColorCard
              title="Secondary"
              bgClass="bg-secondary"
              textClass="text-secondary-foreground"
              radiusClass="rounded-lg"
            />
            <ColorCard
              title="Card"
              bgClass="bg-card border border-border"
              textClass="text-card-foreground"
              radiusClass="rounded-xl"
            />
            <ColorCard
              title="Destructive"
              bgClass="bg-destructive"
              textClass="text-white dark:text-gray-100"
              radiusClass="rounded-md"
            />
          </div>
        </section> */}

        {/* Utilities & Accents */}
        {/* <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-l-4 border-accent pl-3">
            Utilities & Accents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-6 bg-card rounded-lg border border-border">
              <p className="text-xl font-medium text-accent-foreground">
                Accent & Muted
              </p>
              <div className="flex space-x-2">
                <div className="p-3 bg-accent text-accent-foreground rounded-lg">
                  Accent
                </div>
                <div className="p-3 bg-muted text-muted-foreground rounded-lg">
                  Muted
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground/70">
                This block uses{" "}
                <span className="text-ring font-mono">bg-card</span> and{" "}
                <span className="text-ring font-mono">border-border</span>.
              </p>
            </div>

            <div className="p-6 bg-popover rounded-xl border border-border shadow-2xl ring-4 ring-ring/30">
              <p className="text-xl font-medium text-popover-foreground">
                Input & Ring
              </p>
              <input
                type="text"
                placeholder="Input field (bg-input)"
                className="w-full mt-3 p-2 bg-input border-2 border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
              />
              <p className="mt-3 text-sm text-foreground/70">
                The input border and focus ring use{" "}
                <span className="text-ring font-mono">ring-ring</span> and{" "}
                <span className="text-ring font-mono">border-input</span>.
              </p>
            </div>
          </div>
        </section> */}

        {/* Chart Colors */}
        {/* <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-l-4 border-chart-3 pl-3">
            Chart Colors
          </h2>
          <div className="grid grid-cols-1 gap-2 p-4 bg-card rounded-xl border border-border">
            {[1, 2, 3, 4, 5].map((i) => (
              <ChartSwatch key={i} index={i} />
            ))}
          </div>
        </section> */}

        {/* Sidebar Simulation */}
        {/* <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-l-4 border-sidebar-primary pl-3">
            Sidebar Simulation
          </h2>
          <div className="flex h-32 rounded-xl overflow-hidden shadow-xl border border-sidebar-border/50 ring-2 ring-sidebar-ring/50 transition-colors duration-500">
            <div className="w-1/3 p-4 bg-sidebar text-sidebar-foreground">
              <p className="font-bold">Sidebar</p>
              <div className="mt-2 text-sm">
                <p className="text-sidebar-primary">Primary Item</p>
                <p className="p-1 bg-sidebar-accent text-sidebar-accent-foreground rounded-sm mt-1">
                  Accent Item
                </p>
              </div>
            </div>

            <div className="w-2/3 p-4 bg-background text-foreground flex items-center justify-center">
              <p className="opacity-70">Main Content Area</p>
            </div>
          </div>
        </section> */}

        <div
          className="py-6 px-20 "
          style={{ backgroundColor: colors.primary, color: colors.text2 }}
        >
          {" "}
          google
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
