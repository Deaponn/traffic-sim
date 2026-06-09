import { type ReactNode } from "react";
import { Box, Grid, Paper } from "@mui/material";
import NavBar from "./NavBar";
import { themeColors } from "../theme";

interface CreatorLayoutProps {
  sidebarContent: ReactNode;
  mainContent: ReactNode;
  currentStep: number;
  onDownloadJson: () => void;
  sidebarSizes?: object;
  mainSizes?: object;
}

export default function CreatorLayout({
  sidebarContent,
  mainContent,
  onDownloadJson,
  sidebarSizes = { xs: 12, md: 4 },
  mainSizes = { xs: 12, md: 8 },
}: CreatorLayoutProps) {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Grid size={sidebarSizes} sx={{ height: "100%" }}>
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              bgcolor: themeColors.bgApp,
            }}
          >
            <Box sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 1, md: 2 } }}>
              {sidebarContent}
            </Box>
            <Box sx={{ p: { xs: 1, md: 2 }, pt: 0 }}>
              <NavBar handleJsonButton={onDownloadJson} />
            </Box>
          </Paper>
        </Grid>
        <Grid size={mainSizes} sx={{ height: "100%" }}>
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#e0e0e0",
              overflow: "hidden",
            }}
          >
            {mainContent}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
