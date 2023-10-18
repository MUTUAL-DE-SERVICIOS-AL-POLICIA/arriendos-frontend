import { useForm, useProductStore, useRentalStore } from "@/hooks";
import { useEffect, useState } from "react";
import { ComponentInputSelect, ModalSelectComponent } from "@/components";
import { FormRentalModel } from "@/models";
import { PropertieTable } from "../properties";
import { CalendarComponent } from "./calendar";
import { styled } from '@mui/system';
import { Grid } from "@mui/material";
import { CustomerTable } from "../customers";
import { RentalSection } from ".";

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

const virifyDate = (dayEvaluation: Date) => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0);
  if (dayEvaluation < currentDate) {
    return false;
  } else {
    return true;
  }
}

export const RentalView = () => {

  const { room, customer, onValueChange } = useForm(formFields);
  const { postLeakedProduct, clearLakedProduct } = useProductStore();
  const { getRentals } = useRentalStore();
  const [events, setEvents] = useState<any>([]);
  const [showCart, setShowCart] = useState(false);
  const [daySelect, setDaySelect] = useState<Date | null>(null);

  useEffect(() => {
    getRentals(room == null ? null : room.id);
  }, [room])

  useEffect(() => {
    if (daySelect != null) setShowCart(virifyDate(daySelect!));
    if (daySelect != null && room != null && customer != null && virifyDate(daySelect)) {
      postLeakedProduct(daySelect, {
        customer_type: customer.customer_type.id,
        room_id: room.id
      })
    } else {
      clearLakedProduct()
    }
  }, [daySelect, room, customer])

  const handleEvents = (value: any[]) => {
    setEvents(value)
  }
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);
  // Modal =================================================
  const [modalRoom, setModalRoom] = useState(false);
  const handleModalRoom = (value: boolean) => {
    setModalRoom(value);
  };

  const [modalClient, setModalClient] = useState(false);
  const handleModalClient = (value: boolean) => {
    setModalClient(value);
  };
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
            limitInit={5}
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
        <SliderCalendar style={{ width: daySelect ? '68%' : '100%' }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
              <ComponentInputSelect
                title={customer != null ? (customer.institution_name ?? customer.contacts[0].name) : 'Cliente'}
                label={customer == null ? '' : 'Cliente'}
                onPressed={() => handleModalClient(true)}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
              <ComponentInputSelect
                title={room != null ? room.name : 'Ambiente'}
                label={room == null ? '' : 'Ambiente'}
                onPressed={() => handleModalRoom(true)}
              />
            </Grid>
          </Grid>
          <CalendarComponent
            onEvents={(listEvents: any[]) => handleEvents(listEvents)}
            daySelect={daySelect}
            onSelectDay={(day) => {
              setDaySelect(day)
            }}
            screenHeight={screenHeight}
          />
        </SliderCalendar>
        <SliderContent style={{ width: daySelect ? '32%' : '' }}>
          <RentalSection
            showCart={showCart}
            date={daySelect}
            customer={customer}
            events={events}
            onClose={() => {
              setDaySelect(null);
              getRentals(room.id);
            }}
            screenHeight={screenHeight}
          />
        </SliderContent>
      </Container>
    </>
  )
}