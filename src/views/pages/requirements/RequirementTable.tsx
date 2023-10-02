import { ComponentSearch, ComponentTablePagination } from '@/components';
import { useRequirementStore, useSelectorStore } from '@/hooks';
import { RequirementModel } from '@/models';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';


interface tableProps {
  handleEdit?: (requirement: RequirementModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (requirement: RequirementModel) => void;
  stateMultiple?: boolean
}

export const RequirementTable = (props: tableProps) => {
  const {
    handleEdit,
    limitInit = 10,
    stateSelect = false,
    itemSelect,
    stateMultiple = false,
  } = props;

  /*DATA */
  const { selections = [], selectOne, deselectOne, deselectAll } = useSelectorStore();
  const { requirements, flag, getRequirements } = useRequirementStore();


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
              const isSelected = selections.includes(`${requirement.id}requirement`);
              return (
                <TableRow
                  hover
                  key={requirement.id}
                >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(value) => {
                          if (value.target.checked) {
                            if (!stateMultiple) deselectAll(requirements.map((e: RequirementModel) => `${e.id}requirement`));
                            selectOne(`${requirement.id}requirement`);
                            itemSelect!(requirement)
                          } else {
                            deselectOne(`${requirement.id}requirement`);
                          }
                        }}
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
                      <IconButton
                        onClick={() => handleEdit!(requirement)}
                      >
                        <EditOutlined color="info" />
                      </IconButton>
                      <IconButton
                        onClick={() => { }}
                      >
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
