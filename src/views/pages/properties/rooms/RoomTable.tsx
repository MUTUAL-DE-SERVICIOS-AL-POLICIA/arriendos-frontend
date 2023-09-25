import { SeverityPill } from "@/components"
import { useRoomStore } from "@/hooks";
import { RoomModel } from "@/models"
import { Delete, Edit } from "@mui/icons-material";
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

interface roomTableProps {
    rooms: Array<RoomModel>;
    stateSelect?: boolean;
    itemSelect?: (room: RoomModel) => void
    editItem?: (room: RoomModel) => void
}

export const RoomTable = (props: roomTableProps) => {
    const {
        rooms,
        stateSelect = false,
        itemSelect,
        editItem
    } = props;


    const { RoomSelection } = useRoomStore();

    return (
        <>
            <Typography sx={{ fontWeight: 'bold' }}>Ambientes:</Typography>
            <div style={{ overflowY: 'auto'}}>
                <TableContainer style={{ maxHeight: '180px' }} component={Paper} >
                    <Table size="small" stickyHeader >
                        <TableHead>
                            <TableRow>
                                {stateSelect && <TableCell></TableCell>}
                                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Capacidad</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Garantía</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Estado</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#E2F6F0' }}>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms.map((room: RoomModel) => {
                                const isSelected = RoomSelection.id == room.id;
                                return (
                                    <TableRow
                                        key={room.id}
                                        onClick={() => stateSelect && itemSelect!(room)}
                                        style={{
                                            backgroundColor: isSelected ? '#e0e0e0' : 'transparent',
                                        }}
                                    >
                                        {stateSelect && (
                                            <TableCell padding="none">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                        )}
                                        <TableCell>{room.name}</TableCell>
                                        <TableCell>{room.capacity}</TableCell>
                                        <TableCell>{room.warranty}</TableCell>
                                        <TableCell>
                                            <SeverityPill color={room.is_active ? 'success' : 'error'}>
                                                {room.is_active ? 'Disponible' : 'Inactivo'}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="success"
                                                onClick={() => editItem!(room)}
                                            >
                                                <Edit />
                                            </IconButton>
                                            {/* <IconButton
                                                color="error"
                                            >
                                                <Delete />
                                            </IconButton> */}
                                        </TableCell>
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
