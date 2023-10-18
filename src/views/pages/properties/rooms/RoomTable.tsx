import { SeverityPill } from "@/components"
import { RoomModel } from "@/models"
import { Edit } from "@mui/icons-material";
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

interface tableProps {
  rooms: Array<RoomModel>;
  stateSelect?: boolean;
  itemSelect?: (room: RoomModel) => void;
  editItem?: (room: RoomModel) => void;
  items?: any[];
}

export const RoomTable = (props: tableProps) => {
  const {
    rooms,
    stateSelect = false,
    itemSelect,
    editItem,
    items = [],
  } = props;


  return (
    <>
      <Typography sx={{ fontWeight: 'bold' }}>Ambientes:</Typography>
      <div style={{ overflowY: 'auto' }}>
        <TableContainer style={{ maxHeight: '180px' }} component={Paper} >
          <Table size="small" stickyHeader  >
            <TableHead>
              <TableRow >
                {stateSelect && <TableCell />}
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Capacidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Garantía</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Estado</TableCell>
                {!stateSelect && <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room: RoomModel) => {
                const isSelected = items.includes(room.id);
                return (
                  <TableRow
                    key={room.id}
                    onClick={() => stateSelect && room.is_active && itemSelect!(room)}
                    style={{
                      backgroundColor: isSelected ? '#e0e0e0' : 'transparent',
                    }}
                  >
                    {
                      stateSelect && (
                        room.is_active ? (
                          <TableCell padding="none">
                            <Checkbox checked={isSelected} />
                          </TableCell>
                        ) : <TableCell />)}
                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>{room.warranty}</TableCell>
                    <TableCell>
                      <SeverityPill color={room.is_active ? 'success' : 'error'}>
                        {room.is_active ? 'Disponible' : 'Inactivo'}
                      </SeverityPill>
                    </TableCell>
                    {
                      !stateSelect && <TableCell>
                        <IconButton
                          color="success"
                          onClick={() => editItem!(room)}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                    }
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}
