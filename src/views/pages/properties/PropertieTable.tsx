import { ItemPaper } from "@/components";
import { usePropertieStore } from "@/hooks";
import { PropertieModel, RoomModel } from "@/models";
import { AddCircle, Edit } from "@mui/icons-material";
import { Grid, IconButton, Typography, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import noimage from "@/assets/images/no-image.webp";
import { RoomTable, CreateRoom } from "./rooms";


interface tableProps {
  onEdit?: (propertie: PropertieModel) => void;
  stateSelect?: boolean;
  itemSelect?: (room: RoomModel) => void;
  items?: any[];
}

export const PropertieTable = (props: tableProps) => {
  const {
    onEdit,
    stateSelect = false,
    itemSelect,
    items,
  } = props;

  const { properties = [], getPropertiesRooms } = usePropertieStore();
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<any>(null);
  const [change, setChange] = useState<boolean>(true);

  const handleDialog = useCallback((value: boolean) => {
    setopenDialog(value)
    if (!value) return setItemEdit(null)
    setChange(value)
  }, []);

  useEffect(() => {
    getPropertiesRooms();
  }, []);
  return (
    <>
      {properties.map((propertie: PropertieModel) => {
        return (
          <ItemPaper key={propertie.id} elevation={2}>
            <Grid container>
              <Grid item xs={12} sm={3} sx={{ padding: '5px', textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 'bold' }}>{propertie.name}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>{propertie.address}</Typography>
                <Typography sx={{ fontWeight: 'bold' }}>{propertie.department}</Typography>
                <img
                  src={propertie.photo}
                  alt="Descripción de la imagen"
                  style={{ height: '180px', width: '170px', objectFit: 'cover' }}
                  onError={(e: any) => e.target.src = noimage}
                />
                {
                  !stateSelect &&
                  <Box sx={{ textAlign: 'center' }}>
                    <IconButton
                      color="success"
                      onClick={() => onEdit!(propertie)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton color="error">
                      {/* <Delete /> */}
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={() => {
                        setItemEdit({ property: propertie.id })
                        handleDialog(true)
                      }
                      }
                    >
                      <AddCircle />
                    </IconButton>
                  </Box>
                }
              </Grid>
              <Grid item xs={12} sm={9} sx={{ padding: '5px' }}>
                {
                  propertie.rooms != null &&
                  <RoomTable
                    rooms={propertie.rooms}
                    stateSelect={stateSelect}
                    itemSelect={itemSelect}
                    items={items}
                    editItem={(room) => {
                      setItemEdit({ ...room, property: propertie.id });
                      handleDialog(true);
                      setChange(false)
                    }}
                  />
                }
              </Grid>
            </Grid>
          </ItemPaper>
        );
      })}
      {
        openDialog &&
        <CreateRoom
          open={openDialog}
          handleClose={() => handleDialog(false)}
          property={itemEdit}
          change={change}
        ></CreateRoom>
      }
    </>
  )
}
