import {
  Box,
  Typography,
  useTheme,
  Stack,
  Paper,
  styled,
  Divider,
  Button,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

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
      <Box component="div" sx={{ maxWidth: "30rem", margin: "2rem auto" }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          CONTROLE DE DESPESAS
        </Typography>
        <Typography variant="caption">SALDO ATUAL</Typography>
        <Typography variant="h4" sx={{ padding: ".8rem", color: dark }}>
          AKZ 2000
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            {" "}
            <CompanyBalance>
              <Box component="div" sx={{ textAlign: "center" }}>
                <Typography>RECEITAS</Typography>
                <Typography sx={{ color: green[500] }}>2000</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box component="div" sx={{ textAlign: "center" }}>
                <Typography>DESPESAS</Typography>
                <Typography sx={{ color: red[500] }}>2000</Typography>
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
          <Stack spacing={1} sx={{ marginTop: "1rem" }}>
            <Operations sx={{ borderRight: `.5rem solid ${green[500]}` }}>
              <Typography>KAHAMBA</Typography>
              <Typography>2000</Typography>
            </Operations>
          </Stack>
          <Box component="form" sx={{ marginTop: "2rem" }}>
            <Typography sx={{ marginBottom: ".8rem" }}>
              Adicionar transação
            </Typography>
            <Divider
              orientation="horizontal"
              component="div"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            />
            <Box
              component="div"
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField id="outlined-basic" label="Nome" variant="outlined" />
              <TextField id="filled-basic" label="Valor" variant="outlined" />
              <Button variant="contained" type="submit">
                Adicionar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
