import {
  Box,
  Typography,
  useTheme,
  Stack,
  Paper,
  styled,
  Divider,
} from "@mui/material";
import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";

const Home = () => {
  const {
    palette: {
      primary: { light },
    },
  } = useTheme();

  const CompanyBalance = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(3),
    display: "flex",
    marginBottom: ".5rem",
    justifyContent: "space-around",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box component="div">
      <Box component="div" sx={{ maxWidth: "30rem", margin: "2rem auto" }}>
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
          <Stack
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
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
      </Box>
    </Box>
  );
};

export default Home;
