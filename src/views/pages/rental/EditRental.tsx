import { ComponentTableContent } from "@/components/TableContent"
import { usePaymentsStore, useRentalStore, useWarrantyStore } from "@/hooks"
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import { FormPayments, Reason } from "../rentalCalendar/stateRental/payments"
import { Close } from "@mui/icons-material"
import { ComponentButton } from "@/components"

interface Props {
  open: boolean
  onClose: (arg: any) => void
  rental: any
}

export const EditRental = (props: Props) => {
  const {
    open,
    onClose,
    rental
  } = props

  const [ tabValueRegister, setTabValueRegister ] = useState(0)
  const [ modal, setModal ] = useState(false)
  const [ mountPayment, setMountPayment ] = useState(0)
  const [ voucherNumber, setVoucherNumber ] = useState('')
  const [ detail, setDetail ] = useState('')
  const [ tabSelected, setTabSelected ] = useState<Reason>(Reason.payment)
  const [ payment, setPayment ] = useState<number>()
  const [ label, setLabel ] = useState<string>('')
  const [ edit, setEdit] = useState(false)

  const properties = (index: number) => {
    return {
      id: `register-tab-${index}`,
      'aria-controls': `register-tabpanel-${index}`
    }
  }

  const handleChangeRegister = (_: React.SyntheticEvent, newValue: number) => {
    setTabValueRegister(newValue)
  }

  const handleModal = async (value: boolean, payment?: number | null, reason?: Reason) => {
    if(payment) {
      setEdit(true)
      if(reason) {
        setPayment(payment)
        setTabSelected(reason)
        switch(reason!) {
          case Reason.payment:
            const fetchedDetailPayment = await getDetailPayment(payment!);
            setDetail(fetchedDetailPayment.detail)
            setVoucherNumber(fetchedDetailPayment.voucher_number)
            setMountPayment(fetchedDetailPayment.amount_paid)
            break;
          case Reason.extraHour:
            break;
          case Reason.warranty:
            const fetchedDetailWarranty = await getDetailWarranty(payment!)
            if(fetchedDetailWarranty.income > 0) {
              setMountPayment(fetchedDetailWarranty.income)
              setLabel('income')
            } else if(fetchedDetailWarranty.discount > 0) {
              setMountPayment(fetchedDetailWarranty.discount)
              setLabel('discount')
            } else if(fetchedDetailWarranty.returned > 0) {
              setMountPayment(fetchedDetailWarranty.returned)
              setLabel('returned')
            }
            setDetail(fetchedDetailWarranty.detail)
            setVoucherNumber(fetchedDetailWarranty.voucher_number)
            break;
        }
      }
    } else {
      setTabSelected(reason!);
      switch (reason!) {
        case Reason.payment:
          if (payments.length == 0) {
            setMountPayment(mountPayment);
          } else {
            setMountPayment(payments[payments.length - 1].payable_mount)
          }
          break;
        case Reason.extraHour:
          // setMountPayment(mountExtraHour);
          break;
        case Reason.warranty:
          setMountPayment(0)
          break
      }
      setVoucherNumber('')
      setDetail('')
    }
    setModal(value)
  }

  const handleTab = (selectedTab: number) => {
    switch(selectedTab) {
      case 0:
        return Reason.payment
      case 1:
        return Reason.warranty
      default:
        return Reason.damage
    }
  }

  const { payments = [], getRegistersPayments, getDetailPayment } = usePaymentsStore()
  const { warrantys = [], getListWarranty, getDetailWarranty } = useWarrantyStore()
  const { getRentals } = useRentalStore()

  useEffect(() => {
    getRegistersPayments(rental, true, handleModal)
    getListWarranty(rental, true, handleModal)
    getRentals(rental)
  },[])

  return (
    <>
    <Dialog
      maxWidth={'md'}
      fullWidth={true}
      open={open}
      onClose={() => onClose(false)}
    >
      <DialogTitle>Subsanar Alquiler</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => onClose(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
      <form>
        <DialogContent sx={{paddingTop: 0, marginTop: 0}}>
          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Tabs value={tabValueRegister} onChange={handleChangeRegister}>
                <Tab label="Registro de pagos" {...properties(0)}/>
                <Tab label="Registro de garantía" {...properties(1)}/>
              </Tabs>
              <Stack direction="row" alignItems="right">
                {
                  handleTab(tabValueRegister) == 'warranty' &&
                  <ComponentButton
                    onClick={() => handleModal(true, null, Reason.damage)}
                    text={`Registar daño`}
                    height="30px"
                    sx={{marginTop: '10px'}}
                  />
                }
                <ComponentButton
                  text={`Registrar pago`}
                  height="30px"
                  onClick={() => handleModal(true, null, handleTab(tabValueRegister))}
                  sx={{marginTop: '10px', marginLeft: '10px'}}
                />
              </Stack>
              </Stack>
            { tabValueRegister === 0 &&
              <ComponentTableContent
                headers={['N° Comprobante', 'Monto Cancelado', 'Monto a Pagar', 'Detalle', 'Acción']}
                data={payments}
              /> }
            { tabValueRegister === 1 &&
              <ComponentTableContent
                headers={['N°', 'Tipo', 'N° comprobante', 'Entrada', 'Descuento', 'Devuelto', 'Saldo', 'Detalle', 'Acción']}
                data={warrantys}
              />
            }
          </Box>
        </DialogContent>
      </form>
    </Dialog>
    {
      modal && <FormPayments
        amountTotal={mountPayment}
        voucher={voucherNumber}
        detail={detail}
        open={modal}
        handleClose={() => handleModal(false)}
        tabReason={tabSelected}
        selectedEvent={edit ? null : {rental: rental}}
        edit={edit}
        editedObject={payment}
        rental={rental}
        label={label}
        func={handleModal}
        rectify={true}
      />
    }
    </>
  )
}