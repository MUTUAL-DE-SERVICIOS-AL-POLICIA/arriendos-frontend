import { ComponentButton, ItemPaper } from '@/components';
import { usePropertieStore } from '@/hooks';
import { Add, Delete, Edit, InfoOutlined } from '@mui/icons-material';
import { Grid, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { CreatePropertie, RoomTable } from '.';
import { PropertieModel } from '@/models';



export const PropertiesView = () => {

    const { properties = [], getPropertiesRooms } = usePropertieStore();
    const [openDialog, setopenDialog] = useState(false);
    const [itemEdit, setItemEdit] = useState<PropertieModel | null>(null);

    useEffect(() => {
        getPropertiesRooms();
    }, []);

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
            {properties.map((propertie: PropertieModel) => {
                return (
                    <ItemPaper key={propertie.id} elevation={2}>
                        <Grid container>
                            <Grid item xs={12} sm={3} sx={{ padding: '5px' }}>
                                <Typography sx={{ fontWeight: 'bold' }}>{propertie.name}</Typography>
                                <img src={propertie.photo} alt="Descripción de la imagen" style={{ height: '180px', width: '170px', objectFit: 'cover', }} />
                            </Grid>
                            <Grid item xs={12} sm={8} sx={{ padding: '5px' }}>
                                {propertie.rooms != null && <RoomTable rooms={propertie.rooms} />}
                            </Grid>
                            <Grid item xs={12} sm={1} sx={{ padding: '5px', display: 'flex', flexDirection: { xs: 'row', sm: 'column' } }}>
                                <Grid item xs={12} sm={4}>
                                    <IconButton color="info">
                                        <InfoOutlined />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <IconButton
                                        color="success"
                                        onClick={() => {
                                            setItemEdit(propertie);
                                            handleDialog(true);
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <IconButton color="error">
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ItemPaper>
                );
            })}
            {
                openDialog &&
                <CreatePropertie
                    open={openDialog}
                    handleClose={() => handleDialog(false)}
                    propertie={itemEdit}
                />
            }
        </>
    );
}