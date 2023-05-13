import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
const Navbar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" component="h2">
        KIDNEY STONE DETECTION
      </Typography>
    </Box>
  );
};

export default Navbar;
