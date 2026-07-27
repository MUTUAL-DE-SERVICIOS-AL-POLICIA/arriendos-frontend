import { ItemPaper, SkeletonPropertie } from "@/components";
import { useAuthStore, usePropertieStore } from "@/hooks";
import { PropertieModel, RoomModel, SubRooms } from "@/models";
import { AddCircle, Edit } from "@mui/icons-material";
import { Grid, IconButton, Typography, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import noimage from "@/assets/images/no-image.webp";
import { RoomTable, CreateRoom, EditSubRoom, CreateSubRoom } from "./rooms";


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

  const { properties = null, getPropertiesRooms } = usePropertieStore();
  const { hasPermission } = useAuthStore();
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<any>(null);
  const [change, setChange] = useState<boolean>(true);
  const [openSubRoomDialog, setOpenSubRoomDialog] = useState(false);
  const [subRoomToEdit, setSubRoomToEdit] = useState<SubRooms | null>(null);
  const [openCreateSubRoomDialog, setOpenCreateSubRoomDialog] = useState(false);
  const [createSubRoomRoomId, setCreateSubRoomRoomId] = useState<number | null>(null);

  const handleDialog = useCallback((value: boolean) => {
    setopenDialog(value)
    if (!value) return setItemEdit(null)
    setChange(value)
  }, []);

  const handleSubRoomEdit = useCallback((subRoom: SubRooms) => {
    setSubRoomToEdit(subRoom);
    setOpenSubRoomDialog(true);
  }, []);

  const handleCloseSubRoomDialog = useCallback(() => {
    setOpenSubRoomDialog(false);
    setSubRoomToEdit(null);
  }, []);

  const handleCreateSubRoom = useCallback((roomId: number) => {
    setCreateSubRoomRoomId(roomId);
    setOpenCreateSubRoomDialog(true);
  }, []);

  const handleCloseCreateSubRoomDialog = useCallback(() => {
    setOpenCreateSubRoomDialog(false);
    setCreateSubRoomRoomId(null);
  }, []);

  useEffect(() => {
    getPropertiesRooms();
  }, []);
  return (
    <>
      {
        properties == null ?
          <SkeletonPropertie /> :
          properties.map((propertie: PropertieModel) => {
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
                        {hasPermission('rooms.change') && (
                          <IconButton
                            color="success"
                            onClick={() => onEdit!(propertie)}
                          >
                            <Edit />
                          </IconButton>
                        )}
                        <IconButton color="error">
                          {/* <Delete /> */}
                        </IconButton>
                        {hasPermission('rooms.add') && (
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
                        )}
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
                        editSubRoom={handleSubRoomEdit}
                        createSubRoom={handleCreateSubRoom}
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
      {
        openSubRoomDialog &&
        <EditSubRoom
          open={openSubRoomDialog}
          handleClose={handleCloseSubRoomDialog}
          subRoom={subRoomToEdit}
        />
      }
      {
        openCreateSubRoomDialog && createSubRoomRoomId &&
        <CreateSubRoom
          open={openCreateSubRoomDialog}
          handleClose={handleCloseCreateSubRoomDialog}
          roomId={createSubRoomRoomId}
        />
      }
    </>
  )
}
