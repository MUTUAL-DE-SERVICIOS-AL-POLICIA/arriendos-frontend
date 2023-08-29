import { SeverityPill } from "@/components"
import { useRoomStore } from "@/hooks";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export const RoomsView = () => {
    const { rooms } = useRoomStore();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Capacidad</TableCell>
                        <TableCell align="right">Garantía</TableCell>
                        <TableCell align="right">Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms.map((room: any) => (
                        <TableRow
                            key={room.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {room.name}
                            </TableCell>
                            <TableCell align="right">{room.capacity}</TableCell>
                            <TableCell align="right">{room.warranty}</TableCell>
                            <TableCell align="right">
                                <SeverityPill color={room.is_active ? 'success' : 'error'}>
                                    {room.is_active ? 'Activo' : 'Inactivo'}
                                </SeverityPill>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
