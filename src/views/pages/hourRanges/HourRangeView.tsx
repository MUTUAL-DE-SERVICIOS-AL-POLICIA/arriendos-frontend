import { useCallback, useState } from "react";
import { Stack, SvgIcon } from "@mui/material";
import { ComponentButton } from "@/components";
import { Add } from "@mui/icons-material";
import { HourRangeTable, CreateHourRange } from ".";
import { HourRangeModel } from "@/models";

export const HourRangeView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<HourRangeModel | null>(null);



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
        <ComponentButton
          text="Nuevo rango de hora"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>
      <HourRangeTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {
        openDialog &&
        <CreateHourRange
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      }
    </>
  )
}
