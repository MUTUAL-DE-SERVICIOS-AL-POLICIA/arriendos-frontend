import { useCustomerStore, useSelectorStore } from "@/hooks";
import { CustomerModel } from "@/models";
import { DeleteOutline, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { Stack, TableCell, TableRow, IconButton, Checkbox, Collapse } from '@mui/material';
import { useState } from "react";
import { ContactTable } from "./contact";

interface tableProps {
    customer: CustomerModel;
    stateSelect: boolean;
    itemSelect?: (customer: CustomerModel) => void;
    itemEdit: (customer: CustomerModel) => void;
}


export const RowCustomer = (props: tableProps) => {
    const {
        customer,
        stateSelect,
        itemSelect,
        itemEdit,
    } = props;
    const [open, setOpen] = useState(false);
    const { selections = [], selectOne, deselectOne, deselectAll } = useSelectorStore();
    const { deleteRemoveCustomer } = useCustomerStore();
    const isSelected = selections.includes(`${customer.id}customer`);
    return (
        <>
            <TableRow>
                {
                    stateSelect && <TableCell padding="checkbox">
                        <Checkbox
                            checked={isSelected}
                            onChange={(value) => {
                                // if (value.target.checked) {
                                //   deselectAll(hourRanges.map((e: HourRangeModel) => `${e.id}hourRange`));
                                //   selectOne(`${hourRange.id}hourRange`);
                                //   itemSelect!(hourRange);
                                // } else {
                                //   deselectOne(`${hourRange.id}hourRange`);
                                // }
                            }}
                        />
                    </TableCell>
                }
                <TableCell> {customer.nit ?? customer.contacts[0].ci_nit} </TableCell>
                <TableCell>{customer.institution_name ?? customer.contacts[0].name}</TableCell>
                <TableCell>{customer.customer_type.name}</TableCell>
                {
                    customer.customer_type.is_institution ?
                        <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                            </IconButton>
                        </TableCell> :
                        <TableCell />
                }
                <TableCell>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                    >
                        <IconButton onClick={() => itemEdit!(customer)} >
                            <EditOutlined color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteRemoveCustomer(customer)} >
                            <DeleteOutline color="error" />
                        </IconButton>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <ContactTable
                            contacts={customer.contacts}
                            customerId={customer.id}
                        />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
