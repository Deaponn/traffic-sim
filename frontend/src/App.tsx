import { type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import TrafficIcon from "@mui/icons-material/Traffic";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

import StartScreen from "./pages/Start";
import IntersectionCreator from "./pages/IntersectionCreator";
import CommandCreator from "./pages/CommandCreator";
import Runner from "./pages/Runner";
import Login from "./pages/Login";
import LoginButton from "./components/LoginButton";
import { themeColors } from "./theme";

const steps = [
  { label: "Choose Preset", path: "/" },
  { label: "Design Intersection", path: "/create-intersection" },
  { label: "Configure Commands", path: "/commands" },
  { label: "Run Simulation", path: "/run" },
];

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const activeStep = steps.findIndex((step) => step.path === location.pathname);

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
      {!isLoginPage && (
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
          <Box
            sx={{
              position: "absolute",
              left: 32,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {steps.map(({ label }, index) => {
              const stepNum = index;
              const isActive = activeStep === stepNum;

              return (
                <Box
                  key={label}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                      {stepNum + 1}
                    </Box>

                    <Box
                      sx={{
                        borderBottom: isActive
                          ? `2px solid ${themeColors.textGreen}`
                          : "2px solid transparent",
                        pb: 0.5,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: isActive
                            ? themeColors.textGreen
                            : themeColors.textGray,
                        }}
                      >
                        {label}
                      </Typography>
                    </Box>
                  </Box>

                  {index < steps.length - 1 && (
                    <ChevronRightIcon
                      sx={{
                        color: themeColors.circleUnchecked,
                        fontSize: "1rem",
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<StartScreen />} />
          <Route
            path="/create-intersection"
            element={
              <ProtectedRoute>
                <IntersectionCreator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/commands"
            element={
              <ProtectedRoute>
                <CommandCreator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/run"
            element={
              <ProtectedRoute>
                <Runner />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
