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
import { virifyDate } from "@/helpers";

const formFields: FormRentalModel = {
  room: null,
  customer: null,
}

// Estilos ==============================>

const SliderCalendar = styled('div')`
  transition: width 0.5s ease-in;
  padding: 8px;
`;

const SliderContent = styled('div')`
  transition: widtH 0.5s ease-in;
  width: 0%;
`;

export const RentalCalendarView = () => {

  const { room, customer, onValueChange } = useForm(formFields);
  const { postLeakedProduct, clearLakedProduct } = useProductStore();
  const { getRentals } = useRentalStore();
  const [daySelect, setDaySelect] = useState<Date | null>(null);

  useEffect(() => {
    getRentals(room == null ? null : room.id);
  }, [room])

  useEffect(() => {
    if (daySelect != null && room != null && customer != null && virifyDate(daySelect)) {
      postLeakedProduct(daySelect, {
        customer_type: customer.customer_type.id,
        room_id: room.id
      })
    } else {
      clearLakedProduct()
    }
  }, [daySelect, room, customer])

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
      <div style={{ display: 'flex' }}>
        <SliderCalendar style={{ width: daySelect ? '60%' : '100%' }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ px: .5 }}>
              <ComponentInputSelect
                title={customer != null ? (customer.institution_name ?? customer.contacts[0].name) : 'Cliente'}
                label={customer == null ? '' : 'Cliente'}
                onPressed={() => handleModalClient(true)}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ px: .5 }}>
              <ComponentInputSelect
                title={room != null ? room.name : 'Ambiente'}
                label={room == null ? '' : 'Ambiente'}
                onPressed={() => handleModalRoom(true)}
              />
            </Grid>
          </Grid>
          <CalendarComponent
            daySelect={daySelect}
            onSelectDay={(day) => setDaySelect(day)}
            screenHeight={screenHeight}
          />
        </SliderCalendar>
        <SliderContent style={{ width: daySelect ? '40%' : '0%' }}>
          <RentalSection
            date={daySelect}
            customer={customer}
            onClose={() => {
              setDaySelect(null);
              getRentals(room.id);
            }}
            screenHeight={screenHeight}
          />
        </SliderContent>
      </div>
    </>
  )
}