import { ComponentButton } from "@/components";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { UserTable, CreateUser } from ".";
import { useSelectorStore } from "@/hooks";

export const UsersView = () => {
  const [openDialog, setopenDialog] = useState(false);

  const { clearSelect } = useSelectorStore();


  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (value) clearSelect();
    setopenDialog(value);
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Usuarios</Typography>
        <ComponentButton
          text="Nuevo usuario"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <UserTable />
      {
        openDialog &&
        <CreateUser
          open={openDialog}
          handleClose={() => handleDialog(false)}
        />
      }
    </>
  )
}
