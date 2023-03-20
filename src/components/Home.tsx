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
import { useRef, useState, useEffect } from "react";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import CustomizedSnackbars from "./CustomizedSnackbars";
import { Transition } from "./MyStyles";
import SpeedDialTooltipOpen from "./SpeedDialTooltipOpen";
import useGlobalContext from "../hooks/useGlobalContext";
import { MdClear } from "react-icons/md";
import useTransitionStorage from "../hooks/useTransitionStorage";

type handleChangeProps =
  | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  | undefined;

type addTransitionProps = React.FormEventHandler<HTMLFormElement> | undefined;

export interface companyTransitionProps {
  product: string;
  price: number;
  id: number;
}
function validateFieldNameProduct(nameProduct: string) {
  return (
    (nameProduct === "" && "O campo nome não pode estar vazio.") ||
    (!Number.isNaN(+nameProduct) &&
      "O valor do campo nome não pode ser um numero.")
  );
}

function validateFieldPriceProduct(priceProduct: string | number) {
  return (
    (priceProduct === "" && "Digite o valor do produto.") ||
    (priceProduct === 0 && "O valor do produto deve ser diferente de 0.")
  );
}

const Home = () => {
  const [form, setForm] = useState({ product: "", price: 0 });
  const [companyRevenues, setCompanyRevenues] = useState(0);
  const [companyExpenses, setCompanyExpenses] = useState(0);
  const focusOnTheInput = useRef<HTMLInputElement>(null);
  const [companyTransition, setCompanyTransition] = useTransitionStorage<
    companyTransitionProps[]
  >("transition", []);
  const {
    palette: {
      primary: { dark },
    },
  } = useTheme();

  const {
    global: { setOpen, setFeedBack },
  } = useGlobalContext();

  const handleChange: handleChangeProps = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const cleanEachTransition = (idTrans: number) => {
    setCompanyTransition((beforeTransition) =>
      beforeTransition.filter(({ id }) => id !== idTrans)
    );
  };

  useEffect(() => {
    setCompanyRevenues(
      companyTransition
        .filter(({ price }) => price > 0)
        .reduce((acc, tran) => acc + tran.price, 0)
    );

    setCompanyExpenses(
      companyTransition
        .filter(({ price }) => price < 0)
        .reduce((acc, tran) => acc + tran.price, 0)
    );

    localStorage.setItem("transition", JSON.stringify(companyTransition));
  }, [companyTransition]);

  const nameProduct = validateFieldNameProduct(form.product);
  const priceProduct = validateFieldPriceProduct(form.price);

  const totalBalance = companyRevenues - companyExpenses;

  const addTransition: addTransitionProps = (event) => {
    event.preventDefault();
    if (nameProduct) {
      setOpen(true);
      setFeedBack({ kind: "error", message: nameProduct });
    } else if (priceProduct) {
      setOpen(true);
      setFeedBack({ kind: "error", message: priceProduct });
    } else {
      setCompanyTransition([
        ...companyTransition,
        {
          product: form.product,
          price: +form.price,
          id: Number(Math.round(Math.random() * 1000)),
        },
      ]);

      setForm({ product: "", price: 0 });
      focusOnTheInput.current?.focus();
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
          AKZ {Math.abs(totalBalance).toFixed(2).replace(".", ",")}
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            {" "}
            <CompanyBalance>
              <Box component="div" sx={{ textAlign: "center" }}>
                <Typography>RECEITAS</Typography>
                <Typography sx={{ color: green[500] }}>
                  AKZ {companyRevenues.toFixed(2).replace(".", ",")}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box component="div" sx={{ textAlign: "center" }}>
                <Typography>DESPESAS</Typography>
                <Typography sx={{ color: red[500] }}>
                  AKZ {Math.abs(companyExpenses).toFixed(2).replace(".", ",")}
                </Typography>
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
            {companyTransition.length === 0 ? (
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Nenhuma transição adicionada
              </Typography>
            ) : (
              companyTransition.map(({ product, price, id }) => (
                <Transition
                  key={id}
                  sx={{
                    fontWeight: "bold",
                    borderRight: `.5rem solid ${
                      price >= 0 ? green[500] : red[500]
                    }`,
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <MdClear
                      style={{
                        color: red[500],
                        cursor: "pointer",
                      }}
                      onClick={() => cleanEachTransition(id)}
                    />
                    {product}{" "}
                  </Typography>
                  <Typography>
                    {price > 0 ? "+" : "-"}
                    {""} {""}AKZ{""}
                    {""} {Math.abs(price).toFixed(2).replace(".", ",")}
                  </Typography>
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
                inputRef={focusOnTheInput}
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
      <SpeedDialTooltipOpen
        setCompanyTransition={setCompanyTransition}
        companyTransition={companyTransition}
      />
      <CustomizedSnackbars />
    </Box>
  );
};

export default Home;
