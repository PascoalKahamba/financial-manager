import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  MdDeleteForever,
  MdDeleteOutline,
  MdDelete,
  MdLightMode,
} from "react-icons/md";
import useGlobalContext from "../hooks/useGlobalContext";
import { companyTransitionProps } from "./Home";

interface SpeedDialTooltipOpenProps {
  companyTransition: companyTransitionProps[];
  setCompanyTransition: React.Dispatch<
    React.SetStateAction<companyTransitionProps[]>
  >;
}

export default function SpeedDialTooltipOpen({
  setCompanyTransition,
  companyTransition,
}: SpeedDialTooltipOpenProps) {
  const [open, setOpenHere] = React.useState(false);
  const handleOpen = () => setOpenHere(true);

  const {
    global: { setThemeName, setFeedBack, setOpen },
  } = useGlobalContext();

  const revenues = companyTransition.filter(({ price }) => price > 0);
  const expenses = companyTransition.filter(({ price }) => price < 0);

  const cleanTheRevenues = () => {
    if (revenues.length > 0) {
      setCompanyTransition((beforeTransition) =>
        beforeTransition.filter(({ price }) => price < 0)
      );

      setOpen(true);
      setFeedBack({ kind: "success", message: "Receitas eliminadas." });
    } else {
      setOpen(true);
      setFeedBack({
        kind: "warning",
        message: "Nenhuma  receita foi adicionada.",
      });
    }
  };

  const cleanTheExpenses = () => {
    if (expenses.length > 0) {
      setCompanyTransition((beforeTransition) =>
        beforeTransition.filter(({ price }) => price > 0)
      );

      setOpen(true);
      setFeedBack({ kind: "success", message: "Despesas eliminadas." });
    } else {
      setOpen(true);
      setFeedBack({
        kind: "warning",
        message: "Nenhuma despesa foi adicionada.",
      });
    }
  };

  const cleanAllTransition = () => {
    if (companyTransition.length > 0) {
      setCompanyTransition([]);
      setOpen(true);
      setFeedBack({
        kind: "success",
        message: "Todas as transições foram eliminadas.",
      });
    } else {
      setOpen(true);
      setFeedBack({
        kind: "warning",
        message: "Nenhuma transição foi adicionada.",
      });
    }
  };

  const actions = [
    {
      icon: (
        <MdLightMode
          style={{ fontSize: "1.3rem" }}
          onClick={() =>
            setThemeName((beforeTheme) =>
              beforeTheme === "dark" ? "light" : "dark"
            )
          }
        />
      ),
      name: "Alterar_tema",
    },

    {
      icon: (
        <MdDeleteForever
          style={{
            fontSize: "1.3rem",
          }}
          onClick={cleanAllTransition}
        />
      ),
      name: "Apagar_tudo",
    },
    {
      icon: (
        <MdDeleteOutline
          style={{
            fontSize: "1.3rem",
          }}
          onClick={cleanTheRevenues}
        />
      ),
      name: "Apagar_receitas",
    },
    {
      icon: (
        <MdDelete
          style={{
            fontSize: "1.3rem",
          }}
          onClick={cleanTheExpenses}
        />
      ),
      name: "Apagar_despesas",
    },
  ];

  const handleClose = () => {
    setOpenHere(false);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: "fixed",
          bottom: 30,
          right: 16,
          zIndex: 1000,
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(({ name, icon }) => (
          <SpeedDialAction
            key={name}
            icon={icon}
            id={name}
            tooltipTitle={name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
