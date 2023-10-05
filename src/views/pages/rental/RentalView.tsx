import { useForm, useProductStore } from "@/hooks";
import { useEffect, useState } from "react";
import { ComponentSelect, ModalSelectComponent } from "@/components";
import { FormRentalModel } from "@/models";
import { PropertieTable } from "../properties";
import { CalendarComponent } from "./calendar";
import { styled } from '@mui/system';
import { Grid } from "@mui/material";
import { CustomerTable } from "../customers";
import { CartSelectedProduct } from ".";

const formFields: FormRentalModel = {
  room: null,
  customer: null,
}

// Estilos ==============================>
const Container = styled('div')`
  display: flex;
  overflow-x: hidden;
`;

const SliderCalendar = styled('div')`
  width: 100%;
  transition: width 0.5s ease-in;
  padding: 0px 10px;
`;

const SliderContent = styled('div')`
  transition: widtH 0.5s ease-in;
  width: 0%;
`;


export const RentalView = () => {

  const { room, customer, onValueChange } = useForm(formFields);
  const { postLeakedProduct } = useProductStore()

  // Modal =================================================
  const [modalRoom, setModalRoom] = useState(false);
  const handleModalRoom = (value: boolean) => {
    setModalRoom(value);
  };

  const [modalClient, setModalClient] = useState(false);
  const handleModalClient = (value: boolean) => {
    setModalClient(value);
  };

  const [selected, setSelected] = useState(false)
  const [day, setDay] = useState<Date | null>(null)

  const toggleExpanded = (isSelected: boolean, daySelected: Date) => {
    setDay(daySelected)
    if (isSelected) {
      setSelected(isSelected)
    } else {
      setSelected(isSelected)
    }
  }
  useEffect(() => {
    if (day != null) {
      postLeakedProduct(day, {
        customer_type: customer.customer_type.id,
        room_id: room.id
      })
    }
  }, [day])

  return (
    <>
      {modalRoom && <ModalSelectComponent
        stateSelect={true}
        stateMultiple={false}
        title='Ambientes'
        opendrawer={modalRoom}
        handleDrawer={() => handleModalRoom(false)}
      >
        <PropertieTable
          stateSelect={true}
          itemSelect={(v) => {
            if (room == null || room.id != v.id) {
              onValueChange('room', v);
            } else {
              onValueChange('room', null);
            }
            handleModalRoom(false)
          }}
          items={room == null ? [] : [room.id]}
        />
      </ModalSelectComponent>
      }
      {
        modalClient && <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Clientes'
          opendrawer={modalClient}
          handleDrawer={() => handleModalClient(false)}
        >
          <CustomerTable
            stateSelect={true}
            itemSelect={(v) => {
              if (customer == null || customer.id != v.id) {
                onValueChange('customer', v);
              } else {
                onValueChange('customer', null);
              }
              handleModalClient(false)
            }}
            items={customer == null ? [] : [customer.id]}
          />
        </ModalSelectComponent>
      }

      <Container>
        <SliderCalendar style={{ width: selected ? '70%' : '100%' }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ margin: '0px 0px' }}>
              <ComponentSelect
                title={customer != null ? (customer.institution_name ?? customer.contacts[0].name) : 'Cliente'}
                label={customer == null ? '' : 'Cliente'}
                onPressed={() => handleModalClient(true)}
                color="#ebfef8"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ComponentSelect
                title={room != null ? room.name : 'Ambiente'}
                label={room == null ? '' : 'Ambiente'}
                onPressed={() => handleModalRoom(true)}
                color="#ebfef8"
              />
            </Grid>
          </Grid>
          <CalendarComponent
            select={room != null && customer != null}
            onSelect={(isSelected, daySelected) => toggleExpanded(isSelected, daySelected)}
          />
        </SliderCalendar>
        <SliderContent style={{ width: selected ? '30%' : '' }}>
          <CartSelectedProduct
            selected={selected}
            day={day}
            customer={customer}
            room={room}
          />
        </SliderContent>
      </Container>
    </>
  )
}