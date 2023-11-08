import { ComponentButton } from "@/components"
import { ComponentTableContent } from "@/components/TableContent"
import { Tab, Tabs, Typography } from '@mui/material';
import { Box, Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { FormPayments, Reason } from "."
import { useExtraHourStore, useForm, usePaymentsStore, useWarrantyStore } from "@/hooks"
import { EventsCalendarModel, ProductRentalModel, RentalModel } from "@/models";
import { FormWarrantyValidation, WarrantyModel } from "@/models/paymentModel"
interface Props {
  selectedEvent: EventsCalendarModel;
  rental: RentalModel;
}

const formField: WarrantyModel = {
  amountWarranty: 0,
}

export const Rented = (props: Props) => {

  const {
    selectedEvent,
    rental,
  } = props

  const [tabValueRegister, setTabValueRegister] = useState(0)
  const { payments = [], amountTotal, getRegistersPayments } = usePaymentsStore();
  const { extraHours = [], getRegisterExtraHours, getExtraHour } = useExtraHourStore();
  const { warrantys = [], getListWarranty } = useWarrantyStore()
  const [mountPayment, setMountPayment] = useState(0);
  const [mountExtraHour, setMountExtraHour] = useState(0);
  const [ mountWarranty, setMountWarranty ] = useState(0)
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
    getListWarranty(selectedEvent.rental)
  }, []);


  const [tabSelect, setTabSelect] = useState<Reason>(Reason.payment);
  const [modal, setModal] = useState(false);
  // const [ active, setActive ] = useState(true)

  const formValidation: FormWarrantyValidation = {
    amountWarranty: [(value: number) => value > 0 && value <= parseFloat(`${amountWarranty}`), `Debe ingresar el monto de la garantía`],
  }
  const { amountWarranty, onInputChange, amountWarrantyValid } = useForm(formField, formValidation)

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
        case Reason.warranty:
          setMountPayment(mountWarranty)
          break
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

  // const changeWarranty = async () => {
  //   alert(`${amountWarranty}`)
  // }
  // const activeChangeWarranty = () => {
  //   setActive(!active)
  // }
  return (
    <>
      <Box>
        <Tabs value={tabValueRegister} onChange={handleChangeRegister}>
          <Tab label="Registro de pagos" {...properties(0)} />
          <Tab label="Registro de garantía" {...properties(1)} />
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
              style={{ maxHeight: '30px' }}
              direction="row"
              justifyContent="space-between"
              sx={{ py: 2, }}
            >
              <Stack
                direction="row"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'left',
                }}
              >
                {/* <Typography sx={{pr: 1}} >El monto de la garantía es: </Typography>
                <ComponentInput
                  type="text"
                  name="amountWarranty"
                  label=""
                  value={amountWarranty}
                  size="small"
                  width='25%'
                  height='35px'
                  disabled={active}
                  onChange={onInputChange}
                  error={!!amountWarrantyValid}
                />
                <IconButton color="success">
                  <Edit
                    onClick={activeChangeWarranty}
                  />
                </IconButton>
                <IconButton color="warning">
                  <SaveAs onClick={changeWarranty}/>
                </IconButton> */}
              </Stack>
              <Stack spacing={1} direction="row">
                <ComponentButton text={`Registro de daños`}
                  onClick={() => handleModal(true, Reason.damage)}
                  height="35px"
                  width="30%"
                  margin="1px"
                />
                <ComponentButton
                  text={`Registro de garantia`}
                  onClick={() => handleModal(true, Reason.warranty)}
                  height="35px"
                  width="30%"
                  margin="1px"
                />
              </Stack>
            </Stack>
            <ComponentTableContent
              headers={['N° comprobante', 'Entrada', 'Descuento', 'Devuelto', 'Balance', 'Detalle', 'Acción']}
              data={warrantys}
            />
          </>
        }
        {
          tabValueRegister === 2 &&
          <>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ py: 1 }}
            >
              <ComponentButton
                text={`Registrar hora extra`}
                onClick={() => handleModal(true, Reason.extraHour)}
                margin="1px"
              />
            </Stack>
            {
              extraHours.length !== 0 &&
              <ComponentTableContent
                headers={['Lugar', 'Evento', 'N° voucher', 'Cantidad', 'Total', 'Detalle', 'Acción']}
                data={extraHours}
              />
            }
          </>
        }
      </Box>
      {
        modal &&
        <FormPayments
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