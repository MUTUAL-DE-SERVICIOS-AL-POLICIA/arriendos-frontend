import { SeverityPill } from "@/components"
import { useRoomStore } from "@/hooks";
import { RoomModel } from "@/models"
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

interface roomTableProps {
    rooms: Array<RoomModel>;
    stateSelect?: boolean;
    itemSelect?: (room: RoomModel) => void;
}

export const RoomTable = (props: roomTableProps) => {
    const {
        rooms,
        stateSelect = false,
        itemSelect,
    } = props;


    const { RoomSelection } = useRoomStore();

    return (
        <>
            <Typography sx={{ fontWeight: 'bold' }}>Ambientes:</Typography>
            <div style={{ maxHeight: `180px`, overflowY: 'auto' }}>
                <TableContainer component={Paper} >
                    <Table size="small" >
                        <TableHead>
                            <TableRow>
                                {stateSelect && <TableCell></TableCell>}
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Capacidad</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Garantía</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
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
