import { ContactModel } from "@/models";
import { Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

interface tableProps {
  open: boolean;
  contacts: ContactModel[];
}


export const ContactTable = (props: tableProps) => {
  const {
    open,
    contacts,
  } = props;

  return (
    <TableRow style={{ backgroundColor: open ? '#E2F6F0' : '#f2f2f2' }}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Typography variant="h6">Contactos</Typography>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>CI/nit</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Telefono</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} sx={{ borderBottom: '2px solid #ccc' }}>
                  <TableCell>{`${contact.degree ?? ''} ${contact.name}`}</TableCell>
                  <TableCell>{contact.ci_nit}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  )
}
