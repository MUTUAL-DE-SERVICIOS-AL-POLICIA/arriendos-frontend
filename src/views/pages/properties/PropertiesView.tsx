import { ComponentButton } from '@/components';
import { Add } from '@mui/icons-material';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { CreatePropertie, PropertieTable } from '.';
import { PropertieModel } from '@/models';



export const PropertiesView = () => {

    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<PropertieModel | null>(null);



    /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
    const handleDialog = useCallback((value: boolean) => {
        if (!value) setItemEdit(null);
        setopenDialog(value);
    }, []);



    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Stack spacing={1}>
                    <Typography variant="h6">Inmuebles</Typography>
                </Stack>
                <ComponentButton
                    text="Nuevo Inmueble"
                    onClick={() => handleDialog(true)}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
            </Stack>
            <PropertieTable
                onEdit={(propertie) => {
                    setItemEdit(propertie);
                    handleDialog(true);
                }}
            />
            {openDialog &&
                <CreatePropertie
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    propertie={itemEdit}
                />
            }
        </>
    );
}