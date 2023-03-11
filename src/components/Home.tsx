import {
  Box,
  Typography,
  useTheme,
  Stack,
  Paper,
  styled,
  Divider,
} from "@mui/material";
import { green } from "@mui/material/colors";

import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import { Operations } from "./MyStyles";

const Home = () => {
  const {
    palette: {
      primary: { dark },
    },
  } = useTheme();

  const CompanyBalance = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box component="div">
      <Box
        component="div"
        sx={{ maxWidth: "30rem", margin: "2rem auto", backgroundColor: dark }}
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

        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            {" "}
            <CompanyBalance>
              <Box component="div" sx={{ textAlign: "center" }}>
                <Typography>RECEITAS</Typography>
                <Typography>2000</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box component="div" sx={{ textAlign: "center" }}>
                <Typography>DESPESAS</Typography>
                <Typography>2000</Typography>
              </Box>{" "}
            </CompanyBalance>
          </Stack>
        </Box>
        <Box
          component="div"
          sx={{
            marginTop: "2rem",
            width: "100%",
          }}
        >
          <Typography sx={{ marginBottom: ".8rem" }}>Transações</Typography>
          <Divider
            orientation="horizontal"
            component="div"
            sx={{ fontWeight: "bold" }}
          />
          <Stack spacing={2} sx={{ marginTop: "1rem" }}>
            <Operations sx={{ borderRight: `.5rem solid ${green[500]}` }}>
              <Typography>DESPESAS</Typography>
              <Typography>2000</Typography>
            </Operations>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
