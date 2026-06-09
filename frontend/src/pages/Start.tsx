import React, { useRef } from "react";
import { Box, Typography, Container, ButtonBase } from "@mui/material";
import { Traffic, UploadFile, ArrowForward } from "@mui/icons-material";
import { useUIStore } from "../store/useUIStore";
import { useSimulationStore } from "../store/useSimulationStore";
import { PRESETS } from "../presets/intersection";

export default function StartScreen() {
  const setStep = useUIStore((state) => state.setStep);
  const setIntersectionPreset = useSimulationStore(
    (state) => state.setIntersectionPreset,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectPreset = (presetName: string) => {
    const preset = PRESETS.find((p) => p.name === presetName);
    if (preset) {
      setIntersectionPreset(preset);
      setStep(3);
    } else {
      console.warn(`Preset ${presetName} not found in PRESETS`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Placeholder: Loading data from file:", file.name);
    // TODO: Implement FileReader logic to parse JSON
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const json = JSON.parse(e.target?.result as string);
    //   ... populate store with json data ...
    //   setStep(3);
    // };
    // reader.readAsText(file);

    // Reset input so the same file can be selected again
    event.target.value = "";
  };

  const cardStyle = {
    bgcolor: "#F4F1EC",
    borderRadius: 4,
    p: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    transition: "transform 0.2s ease-in-out",
    "&:hover": { transform: "translateY(-4px)" },
    width: "100%",
  };

  return (
    <Box
      sx={{
        bgcolor: "#FAF9F6",
        height: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Box
          textAlign="center"
          mb={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            sx={{
              bgcolor: "#82B092",
              borderRadius: 3,
              p: 2,
              display: "inline-flex",
              mb: 3,
            }}
          >
            <Traffic sx={{ fontSize: 40, color: "white" }} />
          </Box>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontFamily: '"Georgia", "Merriweather", serif',
              color: "#2C2C2C",
            }}
          >
            Traffic Sim
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#7A7A7A", maxWidth: 600 }}
          >
            Design, simulate, and analyze urban traffic flows with organic
            precision.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          {PRESETS.map(({ name, description, icon, iconBg, linkColor }) => (
            <ButtonBase
              key={name}
              onClick={() => handleSelectPreset(name)}
              sx={{ borderRadius: 4 }}
            >
              <Box sx={cardStyle}>
                <Box
                  sx={{
                    bgcolor: iconBg,
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Georgia", serif',
                    mb: 1,
                    color: "#2C2C2C",
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#7A7A7A", flexGrow: 1, mb: 3, lineHeight: 1.5 }}
                >
                  {description}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: linkColor,
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  Select Template <ArrowForward fontSize="small" />
                </Typography>
              </Box>
            </ButtonBase>
          ))}
          <ButtonBase onClick={triggerFileInput} sx={{ borderRadius: 4 }}>
            <Box
              sx={{
                ...cardStyle,
                bgcolor: "transparent",
                border: "2px dashed #D3CFC8",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#EAE5D9",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <UploadFile sx={{ color: "#3e3b35" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontFamily: '"Georgia", serif', mb: 1, color: "#2C2C2C" }}
              >
                Import saved
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#7A7A7A", flexGrow: 1, mb: 3, lineHeight: 1.5 }}
              >
                Load a previously saved project file from JSON format.
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#7A756D",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                Select File <ArrowForward fontSize="small" />
              </Typography>
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </Box>
          </ButtonBase>
        </Box>
      </Container>
    </Box>
  );
}
