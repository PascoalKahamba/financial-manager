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

const actions = [
  { icon: <MdLightMode />, name: "Alterar_tema" },
  { icon: <MdDeleteForever />, name: "Apagar_tudo" },
  { icon: <MdDeleteOutline />, name: "Apagar_receitas" },
  { icon: <MdDelete />, name: "Apagar_despesas" },
];

export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        height: "auto",
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 16,
          zIndex: 1000,
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            sx={{ width: "100%" }}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
