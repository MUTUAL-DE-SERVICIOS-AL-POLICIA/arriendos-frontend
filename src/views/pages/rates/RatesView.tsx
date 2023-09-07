import { ComponentButton } from "@/components";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { CreateRate, RateTable } from ".";

export const RatesView = () => {
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<any>(null);

    /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */

    const handleDialog = useCallback((value: any) => {
        if (!value) setItemEdit(null)
        setopenDialog(value);
    }, []);

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Typography variant="h6">Tarifas</Typography>
                <ComponentButton
                    text="Nueva Tarifa"
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
            </Stack>
            <RateTable
                handleEdit={(v: any) => {
                    setItemEdit(v)
                    handleDialog(true)
                }}
            />
            {
                openDialog &&
                <CreateRate
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit}
                />
            }
        </>
    )
}
