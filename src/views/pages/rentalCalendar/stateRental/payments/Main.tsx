import { ComponentButton } from "@/components"
import { ComponentTableContent } from "@/components/TableContent"
import { Grid, Tab, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { Reason } from "."
import { useRentalStore } from "@/hooks"
import { DeleteForever } from "@mui/icons-material"


interface Props {
  handleModal: (arg1: boolean, arg2: any) => void;
  rental: number;
}

export const Rented = (props: Props) => {

  const {
    handleModal,
    rental
  } = props

  const [tabValueRegister, setTabValueRegister] = useState(0)
  const [payments, setPayments] = useState<Array<any>>([])
  const { getRegistersPayments, deleteLastRegisteredPayment } = useRentalStore()

  const properties = (index: number) => {
    return {
      id: `register-tab-${index}`,
      'aria-controls': `register-tabpanel-${index}`
    }
  }

  const handleChangeRegister = (_: React.SyntheticEvent, newValue: number) => {
    setTabValueRegister(newValue)
  }

  const handleDelete = () => {
    deleteLastRegisteredPayment(rental)
  }

  useEffect(() => {
    (async() => {
      const data = await getRegistersPayments(rental)
      const payments:Array<any> = []
      data.payments.map((e: any, index: number) => {
        payments.push(e.voucher_number)
        payments.push(e.amount_paid)
        payments.push(e.payable_mount)
        if(index === data.payments.length - 1) {
          payments.push(<DeleteForever onClick={handleDelete} color="primary" sx={{cursor: 'pointer'}}/>)
        } else payments.push('')
      })
      setPayments(payments)
    })()
  }, [])


  return (
    <>
      <Box>
        <Tabs value={tabValueRegister} onChange={handleChangeRegister}>
          <Tab label="Registro de pagos" {...properties(0)} />
          <Tab label="Registro de garantía" {...properties(1)} />
          <Tab label="Registro de horas extra" {...properties(2)} />
          <Tab label="Registro de daños" {...properties(3)} />
        </Tabs>
        {tabValueRegister === 0 && (
          <Grid container spacing={2} sx={{ padding: '10px 50px' }}>
            <Grid item xs={12} sm={12} style={{ textAlign: 'right' }}>
              <ComponentButton
                text={`Registro de pagos`}
                onClick={() => handleModal(true, Reason.payment)}
                height="35px"
                width="30%"
                margin="1px"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ComponentTableContent
                headers={['N° Comprobante', 'Monto Cancelado', 'Monto a pagar', 'Acción']}
                data={payments}
              />
            </Grid>
          </Grid>
        )}
        {tabValueRegister === 1 && (
          <Grid container spacing={2} sx={{ padding: '10px 50px' }}>
            <Grid item xs={12} sm={12} style={{ textAlign: 'right' }}>
              <ComponentButton
                text={`Registro de garantia`}
                onClick={() => handleModal(true, Reason.warranty)}
                height="35px"
                width="30%"
                margin="1px"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ComponentTableContent
                headers={['N° Comprobante', 'Monto Cancelado', 'Monto a pagar', 'Acción']}
                data={[]}
              />
            </Grid>
          </Grid>
        )}
        {tabValueRegister === 2 && (
          <Grid container spacing={2} sx={{ padding: '10px 50px' }}>
            <Grid item xs={12} sm={12}>
              <ComponentButton
                text={`Registro de horas extras`}
                onClick={() => handleModal(true, Reason.extraHour)}
                height="35px"
                width="40%"
                margin="1px"
              />
            </Grid>
          </Grid>
        )}
        {tabValueRegister === 3 && (
          <Grid container spacing={2} sx={{ padding: '10px 50px' }}>
            <Grid item xs={12} sm={12}>
              <ComponentButton text={`Registro de daños`}
                onClick={() => handleModal(true, Reason.damage)}
                height="35px"
                width="30%"
                margin="1px"
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  )
}