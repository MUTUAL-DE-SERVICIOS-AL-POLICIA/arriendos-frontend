import { SeverityPill } from "@/components";
import { SubRooms } from "@/models";
import { Collapse, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

interface tableProps {
  open: boolean;
  SubRooms: SubRooms[];
}

const getStateColor = (state: string): 'success' | 'warning' | 'error' | 'default' => {
  switch (state?.toUpperCase()) {
    case 'BUENO': return 'success';
    case 'REGULAR': return 'warning';
    case 'MALO': return 'error';
    default: return 'default';
  }
}

export const SubEnviromentTable = (props: tableProps) => {
  const {
    open,
    SubRooms,
  } = props;

  return (
    <TableRow style={{ backgroundColor: open ? '#E2F6F0' : '#f2f2f2' }}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
        <Collapse in={open} >
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Sub Ambientes:</Typography>
          </Stack>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Activo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                SubRooms.map((subRoom, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: '2px solid #ccc',
                      opacity: subRoom.is_active ? 1 : 0.5,
                    }}
                  >
                    <TableCell>{subRoom.name}</TableCell>
                    <TableCell>{subRoom.quantity}</TableCell>
                    <TableCell>
                      <SeverityPill color={getStateColor(subRoom.state)}>
                        {subRoom.state}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={subRoom.is_active ? 'success' : 'error'}>
                        {subRoom.is_active ? 'Activo' : 'Inactivo'}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}
