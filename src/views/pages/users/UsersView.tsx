import { ComponentButton } from "@/components";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon } from "@mui/material";
import { useCallback, useState } from "react";
import { UserTable, CreateUser } from ".";
import { useAuthStore } from "@/hooks";

export const UsersView = () => {
  const { hasPermission } = useAuthStore();
  const [openDialog, setopenDialog] = useState(false);


  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    setopenDialog(value);
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="end"
      >
        {hasPermission('users.add') && (
          <ComponentButton
            text="Nuevo usuario"
            onClick={() => handleDialog(true)}
            startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
        )}
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
