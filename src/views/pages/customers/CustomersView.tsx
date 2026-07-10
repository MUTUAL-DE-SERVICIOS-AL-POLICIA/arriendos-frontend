import { ComponentButton } from "@/components"
import { Add } from "@mui/icons-material"
import { Stack, SvgIcon } from "@mui/material"
import { useCallback, useState } from "react";
import { CustomerTable } from ".";
import { CustomerModel } from "@/models";
import { CreateCustomer } from "./createCustomer";
import { useAuthStore } from "@/hooks";

export const CustomersView = () => {
  const { hasPermission } = useAuthStore();

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
        justifyContent="end"
      >
        {hasPermission('customers.add') && (
          <ComponentButton
            text="Nuevo Cliente"
            onClick={() => handleDialog(true)}
            startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
        )}
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
