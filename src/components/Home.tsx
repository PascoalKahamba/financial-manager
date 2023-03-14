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
import { useState } from "react";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import CustomizedSnackbars from "./CustomizedSnackbars";
import { Transition } from "./MyStyles";
import SpeedDialTooltipOpen from "./SpeedDialTooltipOpen";
import useGlobalContext from "../hooks/useGlobalContext";

type handleChangeProps =
  | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  | undefined;

type addTransitionProps = React.FormEventHandler<HTMLFormElement> | undefined;

interface TransitionCompanyProps {
  product: string;
  price: number;
}
function validateFieldNameProduct(nameProduct: string) {
  return (
    (nameProduct === "" && "O campo nome não pode estar vazio.") ||
    (!Number.isNaN(+nameProduct) &&
      "O valor do campo nome não pode ser um numero.")
  );
}

function validateFieldPriceProduct(priceProduct: string | number) {
  return priceProduct === "" && "Digite o valor do produto.";
}

const Home = () => {
  const [form, setForm] = useState({ product: "", price: 0 });
  const [transitionCompany, setTransitionCompany] = useState<
    TransitionCompanyProps[]
  >([]);
  const {
    palette: {
      primary: { dark },
    },
  } = useTheme();

  const {
    global: { setOpen, setFeedBack, open },
  } = useGlobalContext();

  const handleChange: handleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const nameProduct = validateFieldNameProduct(form.product);
  const priceProduct = validateFieldPriceProduct(form.price);

  const addTransition: addTransitionProps = (event) => {
    event.preventDefault();
    if (nameProduct) {
      setOpen(true);
      setFeedBack({ kind: "error", message: nameProduct });
    } else if (priceProduct) {
      setOpen(true);
      setFeedBack({ kind: "error", message: priceProduct });
    } else {
      setTransitionCompany([
        { product: form.product, price: +form.price },
        ...transitionCompany,
      ]);

      setForm({ product: "", price: 0 });
    }
  };
  const CompanyBalance = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around",
    color: theme.palette.text.secondary,
  }));

  return (
    <Box component="section">
      <Box component="div" sx={{ maxWidth: "23rem", margin: "2rem auto" }}>
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
            {transitionCompany.length === 0 ? (
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Nenhuma transição adicionada
              </Typography>
            ) : (
              transitionCompany.map(({ product, price }, index) => (
                <Transition
                  key={index}
                  sx={{ borderRight: `.5rem solid ${green[500]}` }}
                >
                  <Typography> {product}</Typography>
                  <Typography>{price}</Typography>
                </Transition>
              ))
            )}
          </Stack>
          <Box
            component="form"
            sx={{ marginTop: "2rem" }}
            onSubmit={addTransition}
          >
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
              <TextField
                value={form.product}
                error={open && nameProduct}
                onChange={handleChange}
                id="product"
                label="Nome"
                variant="outlined"
              />
              <Box
                component="div"
                sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
              >
                <TextField
                  value={form.price}
                  error={open && priceProduct}
                  onChange={handleChange}
                  id="price"
                  type="number"
                  label="Valor"
                  variant="outlined"
                />
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ color: red[500] }}>
                    Negativo - Despesas
                  </Typography>
                  <Typography variant="caption" sx={{ color: green[500] }}>
                    Positivo - Receitas
                  </Typography>
                </Box>
              </Box>
              <Button variant="contained" type="submit">
                Adicionar
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography sx={{ textAlign: "center", marginTop: "2rem" }}>
          &copy; Copyrights -{""}
          <Link href="#" underline="none">
            {""} Pascoal Kahamba
          </Link>
        </Typography>
      </Box>
      <SpeedDialTooltipOpen />
      <CustomizedSnackbars />
    </Box>
  );
};

export default Home;
