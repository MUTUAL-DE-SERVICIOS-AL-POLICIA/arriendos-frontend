import { useLeasesStates } from "@/hooks"
import { RentalStateModel } from "@/models"
import { Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect} from "react"

interface tableProps {
  stateSelect?: boolean
  itemSelect?: (stateType: any) => void
  items?: any[]
  limitInit?: number;
}

export const StateTable = (props: tableProps) => {

  const {
    stateSelect = false,
    itemSelect,
    items = [],
  } = props

  const { states, getAllLeaseState } = useLeasesStates()

  useEffect(() => {
    getAllLeaseState()
  }, [])

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {states.map((state: RentalStateModel) => {
              const isSelected = items.includes(state.id);
              return (
                <TableRow
                  key={state.id}
                  sx={{ borderBottom: '2px solid #ccc'}}
                >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(state)}
                      />
                    </TableCell>
                  }
                  <TableCell>{state.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}