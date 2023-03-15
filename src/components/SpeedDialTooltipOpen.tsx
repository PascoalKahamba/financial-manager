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

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const {
    global: { setThemeName },
  } = useGlobalContext();

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
      icon: <MdDeleteForever style={{ fontSize: "1.3rem" }} />,
      name: "Apagar_tudo",
    },
    {
      icon: <MdDeleteOutline style={{ fontSize: "1.3rem" }} />,
      name: "Apagar_receitas",
    },
    {
      icon: <MdDelete style={{ fontSize: "1.3rem" }} />,
      name: "Apagar_despesas",
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: "fixed",

          bottom: 70,
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
