import { Drawer, Stack } from "@mui/material"
import { ComponentDamage, ComponentDamageRectify, ComponentExtraHour, ComponentPayment } from ".";
import { useDamageStore, useExtraHourStore, useLeasesStates, usePaymentsStore, useWarrantyStore } from "@/hooks";
import { EventsCalendarModel, ProductRentalModel } from "@/models";
import { useEffect } from "react";

export enum Reason {
  payment = 'payment',
  warranty = 'warranty',
  extraHour = 'extraHour',
  damage = 'damage',
}

interface elementsProps {
  amountTotal: number;
  selectedEvent: EventsCalendarModel | null | any;
  open: boolean;
  handleClose: () => void;
  tabReason: Reason
  edit?: boolean;
  voucher?: string;
  detail?: any;
  editedObject?:number
  rental?: number
  label?: string
  func?: (value:boolean) => void
  rectify?: boolean
}


export const FormPayments = (props: elementsProps) => {
  const {
    amountTotal,
    selectedEvent,
    open,
    handleClose,
    tabReason,
    edit = false,
    voucher,
    detail,
    editedObject,
    rental,
    label,
    func,
    rectify
  } = props;

  const { getRegistersPayments, postRegisterPayment, patchRegisterPayment } = usePaymentsStore();
  const { getListWarranty } = useWarrantyStore()
  const { postRegisterWarranty, patchRegisterWarranty } = useWarrantyStore();
  const { postRegisterDiscountWarranty } = useDamageStore();

  const { postRegisterExtraHour } = useExtraHourStore();

  const { rentalInformation, getRental } = useLeasesStates();

  const registerPayment = async (data: any) => {
    if(!edit) { // creación
      console.log("creación, pago")
      let body = null
      if(selectedEvent) {
        body = {
          rental: selectedEvent.rental,
          mount: parseFloat(data.amount),
          voucher_number: parseFloat(data.voucherNumber),
          detail: data.paymentDetail || null
        }
      } else {
        body = {
          rental: rental,
          mount: parseFloat(data.amount),
          voucher_number: parseFloat(data.voucherNumber),
          detail: data.paymentDetail || null
        }
      }
      await postRegisterPayment(body)
      if(selectedEvent) await getRegistersPayments(selectedEvent.rental)
      else if(rental) await getRegistersPayments(rental)
    } else {
      const body = {
        rental: rental,
        amount_paid: parseFloat(data.amount),
        voucher_number: parseFloat(data.voucherNumber),
        detail: data.paymentDetail || null
      }
      await patchRegisterPayment(body, editedObject!)
      if(rental)await getRegistersPayments(rental, true, func)
    }
  }
  const registerWarranty = async (data: any) => {
    if(!edit) {
      console.log("creación, garantía")
      let body = null
      if(selectedEvent) {
        body = {
          rental: selectedEvent.rental,
          income: parseFloat(data.amount),
          voucher_number: parseFloat(data.voucherNumber),
          detail: data.paymentDetail || null
        }
      } else {
        body = {
          rental: rental,
          income: parseFloat(data.amount),
          voucher_number: parseFloat(data.voucherNumber),
          detail: data.paymentDetail || null
        }
      }
        await postRegisterWarranty(body)
      if(selectedEvent) await getListWarranty(selectedEvent.rental)
      else if(rental) await getListWarranty(rental)
    } else {
      console.log("edición, garantía")
      const body:any = {
        rental: rental,
        voucher_number: parseFloat(data.voucherNumber),
        detail: data.paymentDetail || null
      }
      switch(label) {
        case 'income':
          body.income = parseFloat(data.amount)
          break;
        case 'discount':
          body.discount = parseFloat(data.amount)
          break;
        case 'returned':
          body.returned = parseFloat(data.amount)
          break;
      }
      await patchRegisterWarranty(body, editedObject!)
      if(rental) await getListWarranty(rental, true, func)
    }
  }
  const registerExtraHour = async (data: any) => {
    if(selectedEvent) {
      const body = {
        selected_product: data.eventSelect,
        number: parseInt(data.quantity),
        description: data.detail || null,
        voucher_number: parseFloat(data.voucherNumber),
        price: parseFloat(data.amount)
      };
      await postRegisterExtraHour(selectedEvent.rental, body);
    }
  }
  const registerDamage = async (data: any) => {
    if(selectedEvent) {
      const body = {
        rental: selectedEvent.rental,
        detail: data.detail,
        discount: parseFloat(data.discount),
        product: rentalInformation.products.filter((product: ProductRentalModel) => product.id == selectedEvent.product_id)[0].id
      }
      await postRegisterDiscountWarranty(body)
      await getListWarranty(selectedEvent.rental)
    }
  }
  useEffect(() => {
    if(rental) getRental(rental)
  }, [])
  return (
    <Drawer
      PaperProps={{
        style: {
          maxHeight: '75vh',
          bottom: 0,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          backgroundColor: '#f2f2f2',
        },
      }}
      sx={{ zIndex: 9999 }}
      anchor="bottom"
      open={open}
      onClose={() => handleClose()}
    >
      <Stack direction="column" justifyContent="space-between" style={{ padding: '8px' }}>
        {
          tabReason == Reason.payment &&
          <ComponentPayment
            handleClose={handleClose}
            sendData={(data) => registerPayment(data)}
            amountRecomend={amountTotal}
            disalbleMount={!edit && rentalInformation && rentalInformation.products.length == 1}
            voucher={voucher}
            detail={detail}
            edit={edit}
          />
        }
        {
          tabReason == Reason.warranty &&
          <ComponentPayment
            handleClose={handleClose}
            sendData={(data) => registerWarranty(data)}
            amountRecomend={amountTotal}
            voucher={voucher}
            detail={detail}
            edit={edit}
          />
        }
        {
          tabReason == Reason.extraHour &&
          <ComponentExtraHour
            rental={rentalInformation}
            handleClose={handleClose}
            amountRecomend={amountTotal}
            sendData={(data) => registerExtraHour(data)}
          />
        }
        {
          tabReason == Reason.damage && !rectify ?
          <ComponentDamage
            rental={rentalInformation}
            handleClose={handleClose}
            sendData={(data) => registerDamage(data)}
          />
          : rectify && tabReason == Reason.damage && <ComponentDamageRectify
            // rental={selectedEvent}
            rental={rental}
            handleClose={handleClose}
          />
        }
      </Stack>
    </Drawer>
  )
}
