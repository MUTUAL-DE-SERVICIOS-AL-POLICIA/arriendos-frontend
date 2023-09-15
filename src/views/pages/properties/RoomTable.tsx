import { SeverityPill } from "@/components"
import { RoomModel } from "@/models"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

export const RoomTable = ({ rooms }: { rooms: Array<RoomModel> }) => {
    return (
        <>
            <Typography sx={{ fontWeight: 'bold' }}>Ambientes:</Typography>
            <div style={{ maxHeight: `180px`, overflowY: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Capacidad</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Garantía</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms.map((room: RoomModel) => (
                                <TableRow key={room.id}>
                                    <TableCell>{room.name}</TableCell>
                                    <TableCell>{room.capacity}</TableCell>
                                    <TableCell>{room.warranty}</TableCell>
                                    <TableCell>
                                        <SeverityPill color={room.is_active ? 'success' : 'error'}>
                                            {room.is_active ? 'Disponible' : 'Inactivo'}
                                        </SeverityPill>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}
