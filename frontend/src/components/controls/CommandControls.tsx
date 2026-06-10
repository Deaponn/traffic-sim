import { useState, useEffect, type JSX } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Delete,
  DirectionsCar,
  DirectionsWalk,
  TurnLeft,
  ArrowUpward,
  TurnRight,
  RotateRight,
  RotateLeft,
  AddCircleOutline,
  PlaylistAdd,
} from "@mui/icons-material";
import { useSimulationStore } from "../../store/useSimulationStore";
import { useUIStore } from "../../store/useUIStore";
import type {
  WorldDirection,
  ControllerTypes,
  RelativeDirection,
} from "../../types/index";
import { worldDirections } from "../../constants";
import { themeColors } from "../../theme";
import Card from "../Card";

// Helper to calculate end road based on start road and relative turn
const worldAndRelativeToWorldDirection: Record<
  WorldDirection,
  Record<RelativeDirection, WorldDirection>
> = {
  north: { right: "west", left: "east", straightAhead: "south" },
  east: { right: "north", left: "south", straightAhead: "west" },
  south: { right: "east", left: "west", straightAhead: "north" },
  west: { right: "south", left: "north", straightAhead: "east" },
};

export default function CommandControls() {
  const {
    intersectionDescription,
    controllerType,
    setControllerType,
    commands,
    addCommand,
    removeCommand,
  } = useSimulationStore();

  const { setSelectedRoad, setHoveredLaneIndex } = useUIStore();

  // New UI specific states
  const [vehicleLaneStr, setVehicleLaneStr] = useState<string>("north-0");
  const [vehicleTurn, setVehicleTurn] = useState<RelativeDirection>("left");
  const [pedRoad, setPedRoad] = useState<WorldDirection>("north");
  const [pedDirection, setPedDirection] = useState<
    "clockwise" | "counterclockwise"
  >("clockwise");

  // Keep functionality of selecting road/lane for UI feedback
  useEffect(() => {
    const [road, laneStr] = vehicleLaneStr.split("-");
    setSelectedRoad(road as WorldDirection);
    setHoveredLaneIndex(parseInt(laneStr));
  }, [vehicleLaneStr, setSelectedRoad, setHoveredLaneIndex]);

  useEffect(() => {
    if (!vehicleLaneStr) return;
    const [startRoad, laneStr] = vehicleLaneStr.split("-") as [
      WorldDirection,
      string,
    ];
    const laneIdx = parseInt(laneStr, 10);
    const availableTurns =
      intersectionDescription[startRoad]?.lanes[laneIdx]?.availableTurns || [];

    const turnOrder: RelativeDirection[] = ["left", "straightAhead", "right"];
    const leftmostTurn = turnOrder.find((turn) =>
      availableTurns.includes(turn),
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (leftmostTurn) setVehicleTurn(leftmostTurn);
  }, [vehicleLaneStr, intersectionDescription]);

  const handleAddVehicle = () => {
    const [startRoad, laneStr] = vehicleLaneStr.split("-") as [
      WorldDirection,
      string,
    ];
    const laneIdx = parseInt(laneStr);
    const endRoad = worldAndRelativeToWorldDirection[startRoad][vehicleTurn];
    const vehicleCount = commands.filter((c) => c.type === "addVehicle").length;

    addCommand({
      type: "addVehicle",
      vehicleId: `vehicle${vehicleCount + 1}`,
      startRoad,
      endRoad,
      laneIdx,
    });
  };

  const handleAddPedestrian = () => {
    const pedCount = commands.filter((c) => c.type === "addPedestrian").length;
    addCommand({
      type: "addPedestrian",
      pedestrianId: `pedestrian${pedCount + 1}`,
      roadToCross: pedRoad,
      startSide: pedDirection === "clockwise" ? "left" : "right",
    });
  };

  const handleAddStep = () => addCommand({ type: "step" });

  const laneOptions = worldDirections.flatMap(
    (road) =>
      intersectionDescription[road]?.lanes.map((_, idx) => ({
        value: `${road}-${idx}`,
        label: `${road.charAt(0).toUpperCase() + road.slice(1)} Road - Lane ${idx + 1}`,
      })) || [],
  );

  const vehicleButtons: {
    value: RelativeDirection;
    label: string;
    icon: JSX.Element;
  }[] = [
    { value: "left", label: "Left", icon: <TurnLeft fontSize="small" /> },
    {
      value: "straightAhead",
      label: "Straight",
      icon: <ArrowUpward fontSize="small" />,
    },
    { value: "right", label: "Right", icon: <TurnRight fontSize="small" /> },
  ];

  const pedButtons: {
    value: "clockwise" | "counterclockwise";
    label: string;
    icon: JSX.Element;
  }[] = [
    {
      value: "clockwise",
      label: "Clockwise",
      icon: <RotateRight fontSize="small" />,
    },
    {
      value: "counterclockwise",
      label: "Counterclockwise",
      icon: <RotateLeft fontSize="small" />,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Hidden Controller Type Select */}
      <Box sx={{ display: "none" }}>
        <Select
          value={controllerType || ""}
          onChange={(e) => setControllerType(e.target.value as ControllerTypes)}
        >
          <MenuItem value="simple-controller">simple-controller</MenuItem>
        </Select>
      </Box>

      {/* --- ADD VEHICLE SECTION --- */}
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            color: themeColors.textGreen,
          }}
        >
          <DirectionsCar fontSize="small" />
          <Typography variant="h6">Add Vehicle</Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
        >
          Starting Lane
        </Typography>
        <Select
          fullWidth
          size="small"
          value={vehicleLaneStr}
          onChange={(e) => setVehicleLaneStr(e.target.value)}
          sx={{ mb: 2, bgcolor: themeColors.toggleInactiveBg, borderRadius: 2 }}
        >
          {laneOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
        >
          Direction
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          {vehicleButtons.map((btn) => {
            const [startRoad, laneStr] = vehicleLaneStr.split("-") as [
              WorldDirection,
              string,
            ];
            const laneIdx = parseInt(laneStr, 10);
            const availableTurns =
              intersectionDescription[startRoad]?.lanes[laneIdx]
                ?.availableTurns || [];
            const isDisabled = !availableTurns.includes(btn.value);

            return (
              <Button
                key={btn.value}
                disabled={isDisabled}
                onClick={() => setVehicleTurn(btn.value)}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  textTransform: "none",
                  color:
                    vehicleTurn === btn.value ? "white" : themeColors.textMain,
                  bgcolor:
                    vehicleTurn === btn.value
                      ? themeColors.toggleActiveBg
                      : themeColors.toggleInactiveBg,
                  border: `1px solid ${vehicleTurn === btn.value ? themeColors.toggleActiveBg : themeColors.borderLight}`,
                  borderRadius: 2,
                  py: 1,
                  "&:hover": {
                    bgcolor:
                      vehicleTurn === btn.value
                        ? themeColors.buttonGreen
                        : "#f0efe9",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "rgba(0,0,0,0.05)",
                    color: "rgba(0,0,0,0.26)",
                    borderColor: "transparent",
                  },
                }}
              >
                {btn.icon}
                <Typography variant="caption" sx={{ mt: 0.5 }}>
                  {btn.label}
                </Typography>
              </Button>
            );
          })}
        </Box>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddCircleOutline />}
          onClick={handleAddVehicle}
          sx={{
            color: themeColors.buttonGreen,
            borderColor: themeColors.buttonGreen,
            borderRadius: 5,
            textTransform: "none",
            "&:hover": {
              borderColor: themeColors.buttonGreen,
              bgcolor: "rgba(77, 124, 91, 0.04)",
            },
          }}
        >
          Add to Sequence
        </Button>
      </Card>
      <Card sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
            color: themeColors.textGreen,
          }}
        >
          <DirectionsWalk fontSize="small" />
          <Typography variant="h6">Add Pedestrian</Typography>
        </Box>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
        >
          Road Crossing
        </Typography>
        <Select
          fullWidth
          size="small"
          value={pedRoad}
          onChange={(e) => setPedRoad(e.target.value as WorldDirection)}
          sx={{ mb: 2, bgcolor: themeColors.toggleInactiveBg, borderRadius: 2 }}
        >
          {worldDirections.map((r) => (
            <MenuItem key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)} Crosswalk
            </MenuItem>
          ))}
        </Select>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
        >
          Direction
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          {pedButtons.map((btn) => (
            <Button
              key={btn.value}
              onClick={() => setPedDirection(btn.value)}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                textTransform: "none",
                color:
                  pedDirection === btn.value ? "white" : themeColors.textMain,
                bgcolor:
                  pedDirection === btn.value
                    ? themeColors.toggleActiveBg
                    : themeColors.toggleInactiveBg,
                border: `1px solid ${pedDirection === btn.value ? themeColors.toggleActiveBg : themeColors.borderLight}`,
                borderRadius: 2,
                py: 1,
                "&:hover": {
                  bgcolor:
                    pedDirection === btn.value
                      ? themeColors.buttonGreen
                      : "#f0efe9",
                },
              }}
            >
              {btn.icon}
              <Typography variant="caption" sx={{ mt: 0.5 }}>
                {btn.label}
              </Typography>
            </Button>
          ))}
        </Box>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddCircleOutline />}
          onClick={handleAddPedestrian}
          sx={{
            color: themeColors.buttonGreen,
            borderColor: themeColors.buttonGreen,
            borderRadius: 5,
            textTransform: "none",
            "&:hover": {
              borderColor: themeColors.buttonGreen,
              bgcolor: "rgba(77, 124, 91, 0.04)",
            },
          }}
        >
          Add to Sequence
        </Button>
      </Card>

      <Button
        fullWidth
        variant="contained"
        startIcon={<PlaylistAdd />}
        onClick={handleAddStep}
        sx={{
          bgcolor: themeColors.buttonGreen,
          color: "white",
          borderRadius: 5,
          py: 1.5,
          mb: 4,
          textTransform: "none",
          "&:hover": { bgcolor: "#3e6649" },
        }}
      >
        Add Step
      </Button>

      <Box
        sx={{
          pt: 2,
          position: "fixed",
          right: 20,
          top: 0,
          marginTop: 10,
          width: 350,
          height: 250,
          zIndex: 1,
          overflow: "scroll",
        }}
      >
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Command Sequence ({commands.length})
        </Typography>
        <List
          dense
          sx={{
            flexGrow: 1,
            bgcolor: themeColors.toggleInactiveBg,
            borderRadius: 2,
            border: `1px solid ${themeColors.borderLight}`,
            overflowY: "auto",
          }}
        >
          {commands.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 2, textAlign: "center" }}
            >
              No commands added.
            </Typography>
          )}
          {commands.map((cmd, i) => (
            <ListItem
              key={i}
              divider
              secondaryAction={
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => removeCommand(i)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${i + 1}. ${cmd.type}`}
                secondary={
                  cmd.type === "addVehicle"
                    ? `${cmd.startRoad} -> ${cmd.endRoad}`
                    : cmd.type === "addPedestrian"
                      ? `Cross ${cmd.roadToCross} (${cmd.startSide})`
                      : ""
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
