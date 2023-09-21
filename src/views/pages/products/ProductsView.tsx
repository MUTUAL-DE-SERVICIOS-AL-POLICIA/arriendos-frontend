import { ComponentButton } from "@/components";
import { useSelectorStore } from "@/hooks";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { ProductTable } from ".";

export const ProductsView = () => {
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<any>(null);

    const { clearSelect } = useSelectorStore();

    /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */

    const handleDialog = useCallback((value: any) => {
        if (!value) setItemEdit(null)
        if (value) clearSelect();
        setopenDialog(value);
    }, []);

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Typography variant="h6">Productos</Typography>
                <ComponentButton
                    text="Nuevo Producto"
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
            </Stack>
            <ProductTable
                handleEdit={(v: any) => {
                    setItemEdit(v)
                    handleDialog(true)
                }}
            />
            {/* {
                openDialog &&
                <CreateCustomer
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    item={itemEdit}
                />
            } */}
        </>
    )
}
