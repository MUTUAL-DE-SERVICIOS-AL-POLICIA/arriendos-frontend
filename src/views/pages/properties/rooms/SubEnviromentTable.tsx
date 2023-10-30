import { SeverityPill } from "@/components";
import { SubEnvironments } from "@/models";
import { Edit } from "@mui/icons-material";
import { Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

interface tableProps {
  open: boolean;
  subEnvironments: SubEnvironments[];
}

export const SubEnviromentTable = (props: tableProps) => {
  const {
    open,
    subEnvironments,
  } = props;

  return (
    <TableRow style={{ backgroundColor: open ? '#E2F6F0' : '#f2f2f2' }}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} >
          <Typography sx={{ fontWeight: 'bold' }}>Sub Ambientes:</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                subEnvironments.map((subEnvironment, index) => (
                  <TableRow key={index}>
                    <TableCell>{subEnvironment.name}</TableCell>
                    <TableCell>{subEnvironment.quantity}</TableCell>
                    <TableCell>
                      <SeverityPill color={'success'}>
                        {subEnvironment.state}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="success"
                        sx={{ p: 0 }}
                        onClick={() => { }}
                      >
                        <Edit />
                      </IconButton>
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
