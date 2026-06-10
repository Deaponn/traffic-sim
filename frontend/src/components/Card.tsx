import { Box, type BoxProps } from "@mui/material";
import { themeColors } from "../theme";

export default function ControlPanelCard({ children, sx, ...props }: BoxProps) {
  return (
    <Box
      sx={{
        bgcolor: themeColors.bgCard,
        borderRadius: 3,
        p: 2,
        border: `1px solid ${themeColors.borderLight}`,
        mb: 2,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
