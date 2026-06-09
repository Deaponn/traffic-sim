import { create } from "zustand";
import type { WorldDirection } from "../types/index";

interface UIState {
  selectedRoad: WorldDirection;
  hoveredLaneIndex: number | null;

  setSelectedRoad: (road: WorldDirection) => void;
  setHoveredLaneIndex: (index: number | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedRoad: "south",
  hoveredLaneIndex: null,

  setSelectedRoad: (road) => set({ selectedRoad: road }),
  setHoveredLaneIndex: (index) => set({ hoveredLaneIndex: index }),
}));
