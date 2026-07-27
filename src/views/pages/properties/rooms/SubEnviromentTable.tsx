import { SeverityPill } from "@/components";
import { useAuthStore, useRoomStore, usePropertieStore } from "@/hooks";
import { SubRooms } from "@/models";
import { Add, Edit } from "@mui/icons-material";
import { Button, Collapse, IconButton, Stack, Switch, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material"

interface tableProps {
  open: boolean;
  SubRooms: SubRooms[];
  onEdit?: (subRoom: SubRooms) => void;
  onAdd?: () => void;
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
    onEdit,
    onAdd,
  } = props;

  const { hasPermission } = useAuthStore();
  const { patchEditSubRoom } = useRoomStore();
  const { getPropertiesRooms } = usePropertieStore();

  const handleToggleActive = async (subRoom: SubRooms) => {
    await patchEditSubRoom(subRoom.id, { is_active: !subRoom.is_active });
    await getPropertiesRooms();
  };

  return (
    <TableRow style={{ backgroundColor: open ? '#E2F6F0' : '#f2f2f2' }}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }}>Sub Ambientes:</Typography>
            {hasPermission('rooms.add') && onAdd && (
              <Button
                size="small"
                variant="text"
                startIcon={<Add />}
                onClick={onAdd}
                sx={{ textTransform: 'none', fontSize: '0.8rem' }}
              >
                Agregar subambiente
              </Button>
            )}
          </Stack>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Activo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
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
                      {hasPermission('rooms.change') ? (
                        <Tooltip title={subRoom.is_active ? 'Desactivar' : 'Activar'}>
                          <Switch
                            size="small"
                            checked={subRoom.is_active}
                            onChange={() => handleToggleActive(subRoom)}
                          />
                        </Tooltip>
                      ) : (
                        <SeverityPill color={subRoom.is_active ? 'success' : 'error'}>
                          {subRoom.is_active ? 'Activo' : 'Inactivo'}
                        </SeverityPill>
                      )}
                    </TableCell>
                    <TableCell>
                      {onEdit && (
                        <IconButton
                          color="success"
                          sx={{ p: 0 }}
                          onClick={() => onEdit(subRoom)}
                        >
                          <Edit />
                        </IconButton>
                      )}
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
