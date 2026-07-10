import { ComponentButton } from "@/components";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon } from "@mui/material";
import { useCallback, useState } from "react";
import { CreateRate, RateTable } from ".";
import { useAuthStore } from "@/hooks";

export const RatesView = () => {
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
        {hasPermission('products.add') && (
          <ComponentButton
            text="Nueva Tarifa"
            onClick={() => handleDialog(true)}
            startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
        )}
      </Stack>
      <RateTable />
      {
        openDialog &&
        <CreateRate
          open={openDialog}
          handleClose={() => handleDialog(false)}
        />
      }
    </>
  )
}
