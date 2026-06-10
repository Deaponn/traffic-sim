import type { JSX } from "react";
import type {
  Command,
  ControllerTypes,
  IntersectionDescription,
  RoadDescription,
} from "../types/index";
import Grid4x4 from "@mui/icons-material/Grid4x4";
import AltRoute from "@mui/icons-material/AltRoute";
import Balance from "@mui/icons-material/Balance";

const standardRoad: RoadDescription = {
  lanes: [
    { availableTurns: ["left", "straightAhead"] as const },
    { availableTurns: ["straightAhead", "right"] as const },
  ],
};

export const PRESETS: {
  name: string;
  description: string;
  icon: JSX.Element;
  iconBg: string;
  linkColor: string;
  intersectionDescription: IntersectionDescription;
  controller: ControllerTypes;
  commands: Command[];
}[] = [
  {
    name: "Standard Intersection",
    description: "Traffic lights change every 3 simulation steps.",
    icon: <Grid4x4 sx={{ color: "#3e3b35" }} />,
    iconBg: "#EAE5D9",
    linkColor: "#7A756D",
    intersectionDescription: {
      north: standardRoad,
      east: standardRoad,
      south: standardRoad,
      west: standardRoad,
    },
    controller: "simple-controller",
    commands: [
      {
        type: "addVehicle",
        vehicleId: "vehicle1",
        startRoad: "north",
        endRoad: "south",
        laneIdx: 0,
      },
      {
        type: "addVehicle",
        vehicleId: "vehicle2",
        startRoad: "north",
        endRoad: "south",
        laneIdx: 1,
      },
      {
        type: "addVehicle",
        vehicleId: "vehicle3",
        startRoad: "north",
        endRoad: "east",
        laneIdx: 0,
      },
      {
        type: "addVehicle",
        vehicleId: "vehicle4",
        startRoad: "north",
        endRoad: "west",
        laneIdx: 1,
      },
      {
        type: "step",
      },
      {
        type: "addPedestrian",
        pedestrianId: "pedestrian1",
        roadToCross: "east",
        startSide: "right",
      },
      {
        type: "step",
      },
      {
        type: "addPedestrian",
        pedestrianId: "pedestrian2",
        roadToCross: "west",
        startSide: "right",
      },
      {
        type: "step",
      },
      {
        type: "step",
      },
      {
        type: "step",
      },
      {
        type: "step",
      },
      {
        type: "addPedestrian",
        pedestrianId: "pedestrian3",
        roadToCross: "north",
        startSide: "right",
      },
      {
        type: "addPedestrian",
        pedestrianId: "pedestrian4",
        roadToCross: "south",
        startSide: "right",
      },
      {
        type: "addPedestrian",
        pedestrianId: "pedestrian5",
        roadToCross: "south",
        startSide: "left",
      },
      {
        type: "step",
      },
    ],
  },
  {
    name: "With Arrows",
    description: "Like Standard, but Arrows also light up.",
    icon: <AltRoute sx={{ color: "#3e3b35" }} />,
    iconBg: "#D4C2A3",
    linkColor: "#8B7355",
    intersectionDescription: {
      north: standardRoad,
      east: standardRoad,
      south: standardRoad,
      west: standardRoad,
    },
    controller: "simple-controller",
    commands: [],
  },
  {
    name: "Balancing",
    description: "Traffic is balanced based on which road is busier.",
    icon: <Balance sx={{ color: "#3e3b35" }} />,
    iconBg: "#D6DDE0",
    linkColor: "#6A7C87",
    intersectionDescription: {
      north: standardRoad,
      east: standardRoad,
      south: standardRoad,
      west: standardRoad,
    },
    controller: "simple-controller",
    commands: [],
  },
];
