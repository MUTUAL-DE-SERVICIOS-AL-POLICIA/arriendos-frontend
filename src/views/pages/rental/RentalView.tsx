import { useCustomerStore, useForm, useRoomStore, useProductStore } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { CartSelectedProduct } from ".";
import { ComponentSelect, ModalSelectComponent } from "@/components";
import { FormRentalModel } from "@/models";
import { PropertieTable } from "../properties";
import { CalendarComponent } from "./calendar";
import { styled } from '@mui/system';
import { Grid } from "@mui/material";
import { CustomerTable } from "../customers";
import days from '@/models/days.json';
import { useSelector } from "react-redux";

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

  const { room, customer, onInputChange, onResetForm, onValueChange } = useForm(formFields);
  const { RoomSelection, selectRoom, deselectRoom } = useRoomStore();
  const { CustomerSelection, selectCustomer } = useCustomerStore();
  const { leakedProducts, postLeakedProduct, setLeakedProductReload } = useProductStore()

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
      console.log(CustomerSelection)
      console.log(RoomSelection)
      postLeakedProduct({
        customer_type: CustomerSelection.customer_type.id,
        // customer_type: 2,
        room_id: RoomSelection.id
        // room_id: 1
      }).then((data)=>{
        setLeakedProductReload([...data.filter((e:any) =>e.day.includes(days.days[day.getDay()]))]);
      })
    } else console.log("false")
  }, [day])

  return (
    <>
      {modalRoom ? <ModalSelectComponent
        stateSelect={true}
        stateMultiple={false}
        title='Ambientes'
        opendrawer={modalRoom}
        handleDrawer={() => handleModalRoom(false)}
      >
        <PropertieTable
          stateSelect={true}
          itemSelect={(v) => {
            if (RoomSelection.id == v.id) {
              deselectRoom();
              onResetForm();
            } else {
              selectRoom(v);
              onValueChange('room', v)
              //  onInputChange({ target: { name: 'room', value: v.name } });
            }
            handleModalRoom(false)
          }}
        />
      </ModalSelectComponent>
        : <></>
      }
      {
        modalClient ? <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Clientes'
          opendrawer={modalClient}
          handleDrawer={() => handleModalClient(false)}
        >
          <CustomerTable
            stateSelect={true}
            itemSelect={(v) => {
              if (CustomerSelection.id == v.id) {
                onResetForm()
              } else {
                selectCustomer(v)
                onValueChange('customer', v)
                // onInputChange({ target: { name: 'customer', value: v.institution_name}})
              }
              handleModalClient(false)
            }}
          />
        </ModalSelectComponent> : <></>
      }

      <Container>
        <SliderCalendar style={{ width: selected ? '70%' : '100%' }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ margin: '0px 0px' }}>
              <ComponentSelect
                title={customer != null ? (customer.institution_name ?? customer.contacts[0].name) : 'Cliente'}
                onPressed={() => handleModalClient(true)}
                error={false}
                helperText={''}
                color="#ebfef8"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ComponentSelect
                title={room != null ? room.name : 'Ambiente'}
                onPressed={() => handleModalRoom(true)}
                error={false}
                helperText={''}
                color="#ebfef8"
              />
            </Grid>
          </Grid>
          <CalendarComponent
            select={Object.keys(RoomSelection).length != 0}
            onSelect={(isSelected: boolean, daySelected: Date) => toggleExpanded(isSelected, daySelected)}
          />
        </SliderCalendar>
        <SliderContent style={{ width: selected ? '30%' : '' }}>
          <CartSelectedProduct
            selected={selected}
            day={day}
            customer={customer}
            room={room}
          // leakedProducts={leakedProducts}
          />
        </SliderContent>
      </Container>
    </>
  )
}
