import { ComponentSearch, ComponentTablePagination } from '@/components';
import { useRequirementStore } from '@/hooks';
import { RequirementModel } from '@/models';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';


interface tableProps {
  handleEdit?: (requirement: RequirementModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (requirement: RequirementModel) => void;
  items?: any[];
}

export const RequirementTable = (props: tableProps) => {
  const {
    handleEdit,
    limitInit = 10,
    stateSelect = false,
    itemSelect,
    items = [],
  } = props;

  /*DATA */
  const { requirements, flag, getRequirements, deleteRemoveRequirement } = useRequirementStore();


  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)

  useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
    getRequirements({ page, limit }).then((total) => setTotal(total))
  }, [page, limit, flag]);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Requisito"
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }} >Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} >Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requirements.map((requirement: RequirementModel) => {
              const isSelected = items.includes(requirement.id);
              return (
                <TableRow
                  hover
                  key={requirement.id}
                >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(requirement)}
                      />
                    </TableCell>
                  }
                  <TableCell>{requirement.requirement_name}</TableCell>
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <IconButton onClick={() => handleEdit!(requirement)} >
                        <EditOutlined color="info" />
                      </IconButton>
                      <IconButton onClick={() => deleteRemoveRequirement(requirement)} >
                        <DeleteOutline color="error" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={total}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setLimit(value)}
        page={page}
        limit={limit}
      />
    </Stack>
  );
}
