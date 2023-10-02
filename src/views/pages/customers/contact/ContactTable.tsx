import { ComponentButton } from "@/components"
import { ContactModel } from "@/models";
import { Add, DeleteOutline, EditOutlined } from "@mui/icons-material"
import { IconButton, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

interface tableProps {
    contacts: ContactModel[];
}


export const ContactTable = (props: tableProps) => {
    const {
        contacts,
    } = props;
    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Typography variant="h6">Contactos</Typography>
                <ComponentButton
                    text="Nuevo Contacto"
                    onClick={() => { }}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
            </Stack>

            <Table size="small">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>CI/nit</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Telefono</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} >Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.map((contact) => (
                        <TableRow key={contact.id}>
                            <TableCell>{`${contact.degree ?? ''} ${contact.name}`}</TableCell>
                            <TableCell>{contact.ci_nit}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <IconButton onClick={() => { }} >
                                        <EditOutlined color="info" />
                                    </IconButton>
                                    <IconButton onClick={() => { }} >
                                        <DeleteOutline color="error" />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
