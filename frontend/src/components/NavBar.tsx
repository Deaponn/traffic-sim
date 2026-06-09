import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { themeColors } from "../theme";
import { useNavigate, useLocation } from "react-router-dom";

const steps = ["/", "/create-intersection", "/commands", "/run"];

interface INavBar {
  handleJsonButton: () => void;
}

export default function NavBar({ handleJsonButton }: INavBar) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = steps.indexOf(location.pathname);

  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : steps[0];
  const nextStep =
    currentIndex < steps.length - 1
      ? steps[currentIndex + 1]
      : steps[steps.length - 1];

  return (
    <Box>
      <Divider sx={{ borderColor: themeColors.borderLight, mb: 3 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          sx={{
            color: themeColors.textDark,
            textTransform: "none",
            fontSize: "1rem",
          }}
          disabled={currentIndex <= 0}
          onClick={() => navigate(prevStep)}
        >
          Back
        </Button>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={handleJsonButton}
            sx={{
              color: themeColors.textGreen,
              border: `1px solid ${themeColors.borderLight}`,
              bgcolor: themeColors.bgCard,
              borderRadius: 6,
              textTransform: "none",
              px: 3,
              "&:hover": {
                bgcolor: themeColors.borderLight,
              },
            }}
          >
            {"{ }"} Download JSON
          </Button>
          <Button
            endIcon={<Check />}
            variant="contained"
            sx={{
              bgcolor: themeColors.textGreen,
              "&:hover": { bgcolor: "#4A7052" },
              borderRadius: 6,
              textTransform: "none",
              px: 4,
              boxShadow: "none",
              fontSize: "1rem",
            }}
            disabled={currentIndex === steps.length - 1}
            onClick={() => navigate(nextStep)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
