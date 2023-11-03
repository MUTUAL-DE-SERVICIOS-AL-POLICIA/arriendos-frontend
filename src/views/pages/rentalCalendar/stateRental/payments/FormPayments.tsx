import { Drawer, Stack } from "@mui/material"
import { ComponentDamage, ComponentExtraHour, ComponentPayment } from ".";
import { useDamageStore, useExtraHourStore, usePaymentsStore, useWarrantyStore } from "@/hooks";
import { EventsCalendarModel, ProductRentalModel, RentalModel } from "@/models";

export enum Reason {
  payment = 'payment',
  warranty = 'warranty',
  extraHour = 'extraHour',
  damage = 'damage',
}

interface elementsProps {
  eventSelect: number;
  amountTotal: number;
  selectedEvent: EventsCalendarModel;
  rental: RentalModel;
  open: boolean;
  handleClose: () => void;
  tabReason: Reason
}


export const FormPayments = (props: elementsProps) => {
  const {
    eventSelect,
    amountTotal,
    selectedEvent,
    rental,
    open,
    handleClose,
    tabReason,
  } = props;

  const { getRegistersPayments, postRegisterPayment } = usePaymentsStore();
  const { postRegisterWarranty } = useWarrantyStore();
  const { postRegisterDiscountWarranty } = useDamageStore();

  const { postRegisterExtraHour } = useExtraHourStore();

  const registerPayment = async (data: any) => {
    const body = {
      rental: selectedEvent.rental,
      mount: parseFloat(data.amount),
      voucher_number: parseFloat(data.voucherNumber),
      detail: data.paymentDetail || null
    }
    await postRegisterPayment(body)
    await getRegistersPayments(selectedEvent.rental)
  }
  const registerWarranty = async (data: any) => {
    const body = {
      rental: selectedEvent.rental,
      income: parseFloat(data.amount),
      voucher_number: parseFloat(data.voucherNumber),
      detail: data.paymentDetail || null
    }
    await postRegisterWarranty(body)
  }
  const registerExtraHour = async (data: any) => {
    const body = {
      selected_product: eventSelect,
      number: parseInt(data.quantity),
      description: data.detail || null,
      voucher_number: parseFloat(data.voucherNumber),
      price: amountTotal
    };
    await postRegisterExtraHour(selectedEvent.rental, body);
  }
  const registerDamage = async (data: any) => {
    const body = {
      rental: selectedEvent.rental,
      detail: data.detail,
      discount: parseFloat(data.discount),
      product: rental.products.filter((product: ProductRentalModel) => product.id == selectedEvent.product_id)[0].id
    }
    await postRegisterDiscountWarranty(body)
  }
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
            disalbleMount={rental.products.length == 1}
          />
        }
        {
          tabReason == Reason.warranty &&
          <ComponentPayment
            handleClose={handleClose}
            sendData={(data) => registerWarranty(data)}
          />
        }
        {
          tabReason == Reason.extraHour &&
          <ComponentExtraHour
            handleClose={handleClose}
            amountRecomend={amountTotal}
            sendData={(data) => registerExtraHour(data)}
          />
        }
        {
          tabReason == Reason.damage &&
          <ComponentDamage
            handleClose={handleClose}
            sendData={(data) => registerDamage(data)}
          />
        }
      </Stack>
    </Drawer>
  )
}