import { ComponentButton } from "@/components"
import { Add } from "@mui/icons-material"
import { Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { CustomerTable } from ".";
import { CustomerModel } from "@/models";
import { CreateCustomer } from "./createCustomer";

export const CustomersView = () => {

  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<CustomerModel | null>(null);


  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */

  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Clientes</Typography>
        <ComponentButton
          text="Nuevo Cliente"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <CustomerTable
        itemEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {
        openDialog &&
        <CreateCustomer
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  )
}
