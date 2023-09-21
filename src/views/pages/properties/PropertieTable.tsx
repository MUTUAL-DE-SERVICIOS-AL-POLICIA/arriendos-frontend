import { ItemPaper } from "@/components";
import { usePropertieStore } from "@/hooks";
import { PropertieModel, RoomModel } from "@/models";
import { Delete, Edit, Settings } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { RoomTable } from ".";
import { useEffect } from "react";


interface propertieTableProps {
    onEdit?: (propertie: PropertieModel) => void;
    stateSelect?: boolean;
    itemSelect?: (room: RoomModel) => void;
}

export const PropertieTable = (props: propertieTableProps) => {
    const {
        onEdit,
        stateSelect = false,
        itemSelect,
    } = props;

    const { properties = [], getPropertiesRooms } = usePropertieStore();
    useEffect(() => {
        getPropertiesRooms();
    }, []);
    return (
        <>
            {properties.map((propertie: PropertieModel) => {
                return (
                    <ItemPaper key={propertie.id} elevation={2}>
                        <Grid container>
                            <Grid item xs={12} sm={3} sx={{ padding: '5px' }}>
                                <Typography sx={{ fontWeight: 'bold' }}>{propertie.name}</Typography>
                                <img src={propertie.photo} alt="Descripción de la imagen" style={{ height: '180px', width: '170px', objectFit: 'cover', }} />
                            </Grid>
                            <Grid item xs={12} sm={stateSelect ? 9 : 8} sx={{ padding: '5px' }}>
                                {
                                    propertie.rooms != null &&
                                    <RoomTable
                                        rooms={propertie.rooms}
                                        stateSelect={stateSelect}
                                        itemSelect={itemSelect}
                                    />
                                }
                            </Grid>
                            {
                                !stateSelect &&
                                <Grid item xs={12} sm={1} sx={{ padding: '5px', display: 'flex', flexDirection: { xs: 'row', sm: 'column' } }}>
                                    <Grid item xs={12} sm={4}>
                                        <IconButton color="info">
                                            <Settings />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <IconButton
                                            color="success"
                                            onClick={() => onEdit!(propertie)}
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
                            }
                        </Grid>
                    </ItemPaper>
                );
            })}
        </>
    )
}
