import { Apple, Carrot, Wheat, Beef, Milk, Coffee, Cookie } from "lucide-react";
import React from "react";

export const categoryIcons: Record<number, React.ReactNode> = {
    1: React.createElement(Apple, { className: "h-4 w-4" }),
    2: React.createElement(Carrot, { className: "h-4 w-4" }),
    3: React.createElement(Wheat, { className: "h-4 w-4" }),
    4: React.createElement(Beef, { className: "h-4 w-4" }),
    5: React.createElement(Milk, { className: "h-4 w-4" }),
    6: React.createElement(Coffee, { className: "h-4 w-4" }),
    7: React.createElement(Cookie, { className: "h-4 w-4" }),
};

export const categoryAccent: Record<number, string> = {
  1: "#f87171", // red-400
  2: "#4ade80", // green-400
  3: "#fbbf24", // amber-400
  4: "#f472b6", // pink-400
  5: "#60a5fa", // blue-400
  6: "#a78bfa", // violet-400
  7: "#fb923c", // orange-400
};
