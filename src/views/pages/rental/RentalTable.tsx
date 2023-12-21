import { ComponentSearch, ComponentTablePagination } from "@/components";
import { Stack } from "@mui/material";
import { ComponentTableContent } from "@/components/TableContent";
import { useEffect, useState } from "react";
import { useRentalStore } from "@/hooks";
import { EditRental } from ".";
// import { Steps } from "@/components/Steps";

interface tableProps {
  limitInit?: number;
}

export const RentalTable = (props: tableProps) => {
  const {
    limitInit = 10,
  } = props;

  /*DATA */
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)

  const { allRentals = [], allRentalsWithProducts = [], getAllRentals} = useRentalStore()
  const [ open, setOpen ] = useState(false)
  const [ rentalSelected, setRentalSelected ] = useState(null)

  const handleDialog = (value: boolean, rental: any) => {
    setOpen(value)
    setRentalSelected(rental)
  }

  useEffect(() => {
      getAllRentals(page, limit, handleDialog).then((total) => setTotal(total))
  },[page, limit])

  const handleSearch = async(search: string) => {
    setPage(0)
    setLimit(limitInit)
    getAllRentals(0, limitInit, handleDialog, search).then((total) => setTotal(total))
  }

  return (
    <>
      <Stack sx={{ paddingRight: '10px' }}>
        <ComponentSearch
          title="Buscar Alquiler"
          onSearch={handleSearch}
        />
        { allRentals.length !== 0 && allRentalsWithProducts !== 0 && <ComponentTableContent
          headers={['N°', 'N° trámite', 'Cliente', 'Estado', 'Fecha', 'Acción' ]}
          data={allRentals}
          sxHeader={{fontWeight: 'bold', backgroundColor: '#E2F6F0'}}
          useCollapse={true}
          subTableTitle="Producto"
          subTableHeaders={['N° producto', 'Evento', 'Fecha inicio', 'Fecha Final', 'Acción']}
          subTableData={allRentalsWithProducts}
        /> }
        <ComponentTablePagination
          total={total}
          onPageChange={(value) => setPage(value)}
          onRowsPerPageChange={(value) => setLimit(value)}
          page={page}
          limit={limit}
        />
        { open && <EditRental
          open={open}
          onClose={() => handleDialog(false, null)}
          rental={rentalSelected}
        />}
      </Stack>
    </>
  );
}