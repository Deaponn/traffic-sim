import { type ReactNode } from "react";
import { Box, Stepper, Step, StepLabel, Container, Paper } from "@mui/material";
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
        bgcolor: "#f5f5f5",
      }}
    >
      {!isLoginPage && (
        <Paper
          elevation={2}
          sx={{
            p: 1,
            borderRadius: 0,
            zIndex: 1,
            position: "relative",
          }}
        >
          <Container maxWidth="lg">
            <Stepper
              activeStep={activeStep >= 0 ? activeStep : 0}
              alternativeLabel
            >
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Container>
          <Box
            sx={{
              position: "absolute",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <LoginButton />
          </Box>
        </Paper>
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
