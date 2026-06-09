import { Box, Typography } from "@mui/material";
import TrafficIcon from "@mui/icons-material/Traffic";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useUIStore } from "./store/useUIStore";

import StartScreen from "./pages/Start";
import IntersectionCreator from "./pages/IntersectionCreator";
import CommandCreator from "./pages/CommandCreator";
import Runner from "./pages/Runner";

const themeColors = {
  bgApp: "#F5F3EB",
  bgCard: "#EFEBE1",
  bgLane: "#FAFAFA",
  textGreen: "#5D8A66",
  textGray: "#8A8A8A",
  textDark: "#4A4A4A",
  borderLight: "#E0DCD1",
  circleUnchecked: "#DCD8CF",
};

const steps = [
  "Main Menu",
  "Crossroad Builder",
  "Action Builder",
  "Results",
];

export default function App() {
  const currentStep = useUIStore((state) => state.currentStep);

  const renderScreen = () => {
    switch (currentStep) {
      case 1:
        return <StartScreen />;
      case 2:
        return <IntersectionCreator />;
      case 3:
        return <CommandCreator />;
      case 4:
        return <Runner />;
      default:
        return <StartScreen />;
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: themeColors.bgApp,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 4,
          py: 2,
          bgcolor: themeColors.bgApp,
          position: "relative",
          justifyContent: "center",
        }}
      >
        {/* Logo Area */}
        <Box sx={{ position: "absolute", left: 32, display: "flex", alignItems: "center", gap: 1 }}>
          <TrafficIcon sx={{ color: themeColors.textGreen }} />
          <Typography
            variant="h6"
            sx={{
              color: themeColors.textGreen,
              fontFamily: "serif",
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            Traffic Sim
          </Typography>
        </Box>

        {/* Stepper Area */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {steps.map((label, index) => {
            const stepNum = index + 1;
            const isActive = currentStep === stepNum;

            return (
              <Box key={label} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {/* Step Item */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {/* Circle */}
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      ...(isActive
                        ? {
                            bgcolor: themeColors.textGreen,
                            color: "#fff",
                          }
                        : {
                            bgcolor: "transparent",
                            color: themeColors.textGray,
                            border: `2px solid ${themeColors.circleUnchecked}`,
                          }),
                    }}
                  >
                    {stepNum}
                  </Box>

                  {/* Label */}
                  <Box
                    sx={{
                      borderBottom: isActive ? `2px solid ${themeColors.textGreen}` : "2px solid transparent",
                      pb: 0.5,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: isActive ? themeColors.textGreen : themeColors.textGray,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                </Box>

                {/* Separator */}
                {index < steps.length - 1 && (
                  <ChevronRightIcon
                    sx={{ color: themeColors.circleUnchecked, fontSize: "1rem" }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>{renderScreen()}</Box>
    </Box>
  );
}
