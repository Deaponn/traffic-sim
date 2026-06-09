import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      console.error("Google Auth Error:", err);
      setError("Failed to log in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 320,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" textAlign="center" fontWeight="bold">
          Intersection App
        </Typography>

        <Typography variant="body2" textAlign="center" color="text.secondary">
          Please sign in to access the simulation dashboard.
        </Typography>

        {error && (
          <Typography color="error" variant="body2" textAlign="center">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          fullWidth
          sx={{ py: 1.5, mt: 1 }}
        >
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
      </Paper>
    </Box>
  );
}
