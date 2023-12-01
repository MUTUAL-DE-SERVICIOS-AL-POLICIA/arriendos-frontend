import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

interface Props {
  data: Array<any>;
  stateSelect?: boolean;
  itemSelect?: (departement: any) => void;
  items?: any[];
}

export const DepartamentTable = (props: Props) => {

  const { data, stateSelect = false, items = [], itemSelect} = props

  return (
    <TableContainer>
      <Table sx={{ minWidth: 350 }} size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>
              Departamento
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((departament: any) => {
              const isSelected = items.includes(departament.id)
              return (
                <TableRow
                  key={departament.id}
                >
                  { stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(departament)}
                      />
                    </TableCell>
                  }
                  <TableCell>{`${departament.name}`}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}