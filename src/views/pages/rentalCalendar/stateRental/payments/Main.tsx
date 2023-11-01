import { ComponentButton } from "@/components"
import { ComponentTableContent } from "@/components/TableContent"
import { Grid, Tab, Tabs, Typography } from '@mui/material';
import { Box, Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { FormPayments, Reason } from "."
import { useRentalStore } from "@/hooks"
import { EventsCalendarModel, RentalModel } from "@/models";


interface Props {
  selectedEvent: EventsCalendarModel;
  rental: RentalModel;
}

export const Rented = (props: Props) => {

  const {
    selectedEvent,
    rental,
  } = props

  const [tabValueRegister, setTabValueRegister] = useState(0)
  // const [payments, setPayments] = useState<Array<any>>([])
  // const [amountTotal, setAmountTotal] = useState(100);
  const { payments = [], amountTotal, getRegistersPayments } = useRentalStore()

  const properties = (index: number) => {
    return {
      id: `register-tab-${index}`,
      'aria-controls': `register-tabpanel-${index}`
    }
  }

  const handleChangeRegister = (_: React.SyntheticEvent, newValue: number) => {
    setTabValueRegister(newValue)
  }

  useEffect(() => {
    (async () => {
      await getRegistersPayments(selectedEvent.rental)

    })()
  }, [])


  const [tabSelect, setTabSelect] = useState<Reason>(Reason.payment);
  const [modal, setModal] = useState(false);
  const handleModal = (value: boolean, reason?: Reason) => {
    if (reason) setTabSelect(reason!);
    setModal(value);
  };

  return (
    <>
      <Box>
        <Tabs value={tabValueRegister} onChange={handleChangeRegister}>
          <Tab label="Registro de pagos" {...properties(0)} />
          <Tab label="Registro de garantía" {...properties(1)} />
          <Tab label="Registro de horas extra" {...properties(2)} />
          <Tab label="Registro de daños" {...properties(3)} />
        </Tabs>
        {
          tabValueRegister === 0 &&
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ py: 1 }}
            >
              <Typography>El monto del alquiler es: {amountTotal} Bs</Typography>
              <ComponentButton
                text={`Registrar pago`}
                onClick={() => handleModal(true, Reason.payment)}
                height="35px"
                width="30%"
                margin="1px"
                disable={payments.length > 0 && payments[payments.length - 1].payable_mount == 0}
              />
            </Stack>
            {
              payments.length !== 0 &&
              <ComponentTableContent
                headers={['N° Comprobante', 'Monto Cancelado', 'Monto a pagar', 'Detalle', 'Acción']}
                data={payments}
              />
            }
          </>
        }
        {
          tabValueRegister === 1 &&
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
        }
        {
          tabValueRegister === 2 &&
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
        }
        {
          tabValueRegister === 3 &&
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
        }
      </Box>
      {
        modal &&
        <FormPayments
          amountTotal={amountTotal}
          open={modal}
          handleClose={() => handleModal(false)}
          tabReason={tabSelect}
          selectedEvent={selectedEvent}
          rental={rental!}
        />
      }
    </>
  )
}