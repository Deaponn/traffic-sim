import {
  relativeDirections,
  worldDirections,
} from "../constants";

export type WorldDirection = (typeof worldDirections)[number];
export type RelativeDirection = (typeof relativeDirections)[number];

export interface LaneDescription {
  availableTurns: RelativeDirection[];
}
