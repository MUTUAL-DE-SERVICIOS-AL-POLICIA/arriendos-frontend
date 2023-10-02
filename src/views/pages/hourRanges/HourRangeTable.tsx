
import { useSelectorStore } from "@/hooks";
import { useHourRangeStore } from "@/hooks/useHourRangeStore";
import { HourRangeModel } from "@/models";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";


interface tableProps {
  handleEdit?: (hourRange: HourRangeModel) => void;
  stateSelect?: boolean;
  itemSelect?: (hourRange: HourRangeModel) => void;
}

export const HourRangeTable = (props: tableProps) => {
  const {
    handleEdit,
    stateSelect = false,
    itemSelect,
  } = props;

  /*DATA */
  const { hourRanges, getHourRanges } = useHourRangeStore();
  const { selections = [], selectOne, deselectOne, deselectAll } = useSelectorStore();
  useEffect(() => {
    getHourRanges()
  }, []);


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {
                stateSelect && <TableCell />
              }
              <TableCell sx={{ fontWeight: 'bold' }}>Rango</TableCell>
              {
                !stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {hourRanges.map((hourRange: HourRangeModel) => {
              const isSelected = selections.includes(`${hourRange.id}hourRange`);
              return (
                <TableRow
                  key={hourRange.id}
                >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(value) => {
                          if (value.target.checked) {
                            deselectAll(hourRanges.map((e: HourRangeModel) => `${e.id}hourRange`));
                            selectOne(`${hourRange.id}hourRange`);
                            itemSelect!(hourRange);
                          } else {
                            deselectOne(`${hourRange.id}hourRange`);
                          }
                        }}
                      />
                    </TableCell>
                  }
                  <TableCell>{hourRange.name}</TableCell>
                  {
                    !stateSelect && <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton
                          onClick={() => handleEdit!(hourRange)}
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
