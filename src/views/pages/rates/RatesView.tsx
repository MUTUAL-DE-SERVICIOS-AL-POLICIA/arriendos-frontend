import { ComponentButton } from "@/components";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon } from "@mui/material";
import { useCallback, useState } from "react";
import { CreateRate, RateTable } from ".";
import { useAuthStore } from "@/hooks";
import { RateModel } from "@/models";

export const RatesView = () => {
  const { hasPermission } = useAuthStore();
  const [openDialog, setopenDialog] = useState(false);
  const [rateToEdit, setRateToEdit] = useState<RateModel | null>(null);

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    setopenDialog(value);
  }, []);

  const handleEdit = useCallback((rate: RateModel) => {
    setRateToEdit(rate);
    setopenDialog(true);
  }, []);

  const handleClose = useCallback(() => {
    setopenDialog(false);
    setRateToEdit(null);
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
            onClick={() => { setRateToEdit(null); handleDialog(true); }}
            startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
        )}
      </Stack>
      <RateTable onEdit={handleEdit} />
      {
        openDialog &&
        <CreateRate
          open={openDialog}
          handleClose={handleClose}
          rateToEdit={rateToEdit}
        />
      }
    </>
  )
}
