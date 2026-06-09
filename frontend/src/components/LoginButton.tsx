import { Button, Box, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";

export default function LoginButton() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    await signOut(auth);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  if (user) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {user.displayName || user.email}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={handleLogin}
    >
      Login
    </Button>
  );
}
