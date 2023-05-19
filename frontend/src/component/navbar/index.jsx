import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavMenu from "./navMenu";

const Navbar = () => {
  const token = useSelector((state) => state.user.token);
  const theme = useTheme();
  const main = theme.palette.primary.main;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        height: "3rem",
        width: "100%",
        background: main,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        zIndex: 999,
        boxShadow: "2px 6px 4px rgba(0, 0,0,0.15)",
      }}
    >
      <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
        <Typography variant="h6" color="#fff">
          LIBRARY
        </Typography>
      </Box>

      {!token && (
        <Button
          variant="text"
          onClick={() => {
            navigate("/auth");
          }}
          sx={{ backgroundColor: main, color: "#fff" }}
        >
          Sign in
        </Button>
      )}
      {token && <NavMenu />}
    </Box>
  );
};

export default Navbar;
