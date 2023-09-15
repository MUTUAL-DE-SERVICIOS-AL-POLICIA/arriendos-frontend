import { SeverityPill } from "@/components"
import { useRoomStore, useSelectorStore } from "@/hooks";
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export const RoomsView = ({ stateSelect = false }: { stateSelect: boolean }) => {
    const { rooms } = useRoomStore();
    const { selectionsRooms = [], selectRoomOne, deselectRoomOne, clearRoomsSelect } = useSelectorStore();
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {stateSelect && <TableCell></TableCell>}
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Capacidad</TableCell>
                        <TableCell align="right">Garantía</TableCell>
                        <TableCell align="right">Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rooms.map((room: any, index: number) => {
                        const isSelected = selectionsRooms.includes(room.name);
                        return (
                            <TableRow
                                key={index}
                                onClick={() => {
                                    if (!isSelected) {
                                        clearRoomsSelect();
                                        selectRoomOne(room.name);
                                    } else {
                                        deselectRoomOne(room.name);
                                    }
                                }}
                            >
                                {stateSelect && (
                                    <TableCell padding="none">
                                        <Checkbox checked={isSelected} />
                                    </TableCell>
                                )}
                                <TableCell padding="none">
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
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
