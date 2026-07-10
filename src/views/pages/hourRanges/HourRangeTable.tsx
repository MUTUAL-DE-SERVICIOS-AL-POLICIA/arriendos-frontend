

import { SkeletonComponent } from "@/components";
import { useAuthStore } from "@/hooks";
import { useHourRangeStore } from "@/hooks/useHourRangeStore";
import { HourRangeModel } from "@/models";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";


interface tableProps {
  handleEdit?: (hourRange: HourRangeModel) => void;
  stateSelect?: boolean;
  itemSelect?: (hourRange: HourRangeModel) => void;
  items?: any[];
}

export const HourRangeTable = (props: tableProps) => {
  const {
    handleEdit,
    stateSelect = false,
    itemSelect,
    items = [],
  } = props;

  /*DATA */
  const { hourRanges, getHourRanges, deleteRemoveHourRange } = useHourRangeStore();
  const { hasPermission } = useAuthStore();
  useEffect(() => {
    getHourRanges()
  }, []);


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Rango</TableCell>
              {
                !stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {hourRanges == null ?
              <SkeletonComponent
                quantity={2}
              /> : hourRanges.map((hourRange: HourRangeModel) => {
                const isSelected = items.includes(hourRange.id);
                return (
                  <TableRow
                    key={hourRange.id}
                    sx={{ borderBottom: '2px solid #ccc' }}
                  >
                    {
                      stateSelect && <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => itemSelect!(hourRange)}
                        />
                      </TableCell>
                    }
                    <TableCell>{`${hourRange.time} HORAS`}</TableCell>
                    {
                      !stateSelect &&                       <TableCell>
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={2}
                        >
                          {hasPermission('products.change') && (
                            <IconButton
                              sx={{ p: 0 }}
                              onClick={() => handleEdit!(hourRange)}
                            >
                              <EditOutlined color="info" />
                            </IconButton>
                          )}
                          {hasPermission('products.delete') && (
                            <IconButton
                              sx={{ p: 0 }}
                              onClick={() => deleteRemoveHourRange(hourRange)}
                            >
                              <DeleteOutline color="error" />
                            </IconButton>
                          )}
                        </Stack>
                      </TableCell>
                    }
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
