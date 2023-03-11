import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";

const Home = () => {
  const {
    palette: {
      primary: { light },
    },
  } = useTheme();

  return (
    <Box component="div">
      <Box
        component="div"
        sx={{ maxWidth: "30rem", margin: "2rem auto", backgroundColor: light }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          CONTROLE DE DESPESAS
        </Typography>
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          SALDO ATUAL
        </Typography>
        <Box component="div" sx={{ padding: ".5rem" }}>
          AKZ 2000
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
