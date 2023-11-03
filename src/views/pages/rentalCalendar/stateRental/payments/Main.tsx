import { ComponentButton, SelectComponent } from "@/components"
import { ComponentTableContent } from "@/components/TableContent"
import { Tab, Tabs, Typography } from '@mui/material';
import { Box, Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { FormPayments, Reason } from "."
import { useExtraHourStore, usePaymentsStore } from "@/hooks"
import { EventsCalendarModel, ProductRentalModel, RentalModel } from "@/models";
import { format } from "date-fns";
import esES from 'date-fns/locale/es';
import { formatDate } from "@/helpers";

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
  const { payments = [], amountTotal, getRegistersPayments } = usePaymentsStore();
  const { extraHours = [], getRegisterExtraHours, getExtraHour } = useExtraHourStore();
  const [mountPayment, setMountPayment] = useState(0);
  const [mountExtraHour, setMountExtraHour] = useState(0);
  const [eventSelect, setEventSelect] = useState<any>('');
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
    getRegistersPayments(selectedEvent.rental)
    getRegisterExtraHours(selectedEvent.rental)
  }, []);


  const [tabSelect, setTabSelect] = useState<Reason>(Reason.payment);
  const [modal, setModal] = useState(false);
  const handleModal = (value: boolean, reason?: Reason) => {
    if (reason) {
      setTabSelect(reason!);
      switch (reason!) {
        case Reason.payment:
          if (payments.length == 0) {
            setMountPayment(amountTotal);
          } else {
            setMountPayment(payments[payments.length - 1].payable_mount)
          }
          break;
        case Reason.extraHour:
          setMountPayment(mountExtraHour);
          break;
      }
    }
    setModal(value);
  };

  const handleEvent = async (value: any) => {
    setMountExtraHour(0);
    console.log(value)
    const price = await getExtraHour(value);
    setMountExtraHour(price);
    setEventSelect(value)
  }
  return (
    <>
      <Box>
        <Tabs value={tabValueRegister} onChange={handleChangeRegister}>
          <Tab label="Registro de pagos" {...properties(0)} />
          <Tab label="Registro de garantía" {...properties(1)} />
          <Tab label="Registro de daños" {...properties(3)} />
          <Tab label="Registro de horas extra" {...properties(2)} />
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
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ py: 1 }}
            >
              <Typography>El monto de la garantía es: {amountTotal} Bs</Typography>
              <ComponentButton
                text={`Registro de garantia`}
                onClick={() => handleModal(true, Reason.warranty)}
                height="35px"
                width="30%"
                margin="1px"
              />
            </Stack>
            {/* <ComponentTableContent
                headers={['N° Comprobante', 'Monto Cancelado', 'Monto a pagar', 'Acción']}
                data={[]}
              /> */}
          </>
        }
        {
          tabValueRegister === 2 &&
          <>
            <ComponentButton text={`Registro de daños`}
              onClick={() => handleModal(true, Reason.damage)}
              height="35px"
              width="30%"
              margin="1px"
            />
          </>
        }
        {
          tabValueRegister === 3 &&
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ py: 1 }}
            >
              <SelectComponent
                handleSelect={handleEvent}
                label={`Seleccionar Evento`}
                options={[...rental.products.map((item: ProductRentalModel) => ({ id: item.id, name: `${item.id} ${format(formatDate(item.start_time), 'EEEE dd-MMMM HH:mm', { locale: esES })} ${item.event} ${item.property}-${item.room}` }))]}
                value={eventSelect}
              />
              <ComponentButton
                text={`Registrar hora extra`}
                onClick={() => handleModal(true, Reason.extraHour)}
                margin="1px"
                disable={mountExtraHour === 0}
              />
            </Stack>
            {
              extraHours.length !== 0 &&
              <ComponentTableContent
                headers={['Lugar', 'Evento', 'N° voucher', 'cantidad', 'total', 'Detalle']}
                data={extraHours}
              />
            }
          </>
        }
      </Box>
      {
        modal &&
        <FormPayments
          eventSelect={eventSelect}
          amountTotal={mountPayment}
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