
import { useForm, useProductStore } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { FormEvent, useCallback, useState } from "react";
import { FormProductModel, FormProductValidations, HourRangeModel, ProductModel, RateModel, RoomModel } from "@/models";
import { ComponentAutoCompleteSelect, ComponentInput, ComponentInputSelect, ModalSelectComponent } from "@/components";

import days from '@/models/days.json';
import { HourRangeTable } from "../hourRanges";
import { PropertieTable } from "../properties";
import { RateTable } from "../rates";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: ProductModel | null;
}
const formFields: FormProductModel = {
  day: [],
  hour_range: null,
  room: null,
  rate: null,
  mount: 0,
}
const formValidations: FormProductValidations = {
  day: [(values: string[]) => values.length >= 1, 'Debe ingresar almenos un día'],
  hour_range: [(value: HourRangeModel) => value != null, 'Debe seleccionar un rango de horas'],
  room: [(value: RoomModel) => value != null, 'Debe seleccionar un ambiente'],
  rate: [(value: RateModel) => value != null, 'Debe seleccionar una tarifa'],
  mount: [(values: number) => values != 0, 'Debe agregar un precio'],
}


export const CreateProduct = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { postCreateProduct, patchUpdateProduct } = useProductStore();
  const {
    day, hour_range, room, rate, mount,
    onInputChange, onArrayChange, onValueChange, isFormValid, onResetForm,
    dayValid, hour_rangeValid, roomValid, rateValid, mountValid } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateProduct({
        day,
        rate: rate.id,
        room: room.id,
        hour_range: hour_range.id,
        mount,
      });
    } else {
      patchUpdateProduct(item.id, {
        day,
        rate: rate.id,
        room: room.id,
        hour_range: hour_range.id,
        mount,
      });
    }
    handleClose();
    onResetForm();
  }


  const [modalHourRange, setModalHourRange] = useState(false);
  const handleModalHourRange = useCallback((value: boolean) => {
    setModalHourRange(value);
  }, []);

  const [modalRoom, setModalRoom] = useState(false);
  const handleModalRoom = useCallback((value: boolean) => {
    setModalRoom(value);
  }, []);

  const [modalRate, setModalRate] = useState(false);
  const handleModalRate = useCallback((value: boolean) => {
    setModalRate(value);
  }, []);
  return (
    <>
      {/* MODAL PARA EL RANGO DE HORAS */}
      {
        modalHourRange &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Rangos de horas'
          opendrawer={modalHourRange}
          handleDrawer={handleModalHourRange}

        >
          <HourRangeTable
            stateSelect={true}
            itemSelect={(v) => {
              if (hour_range == null || hour_range.id != v.id) {
                onValueChange('hour_range', v);
                handleModalHourRange(false)
              }
            }}
            items={hour_range == null ? [] : [hour_range.id]}
          />
        </ModalSelectComponent>
      }
      {/* MODAL PARA EL AMBIENTE */}
      {
        modalRoom &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Ambiente'
          opendrawer={modalRoom}
          handleDrawer={handleModalRoom}
        >
          <PropertieTable
            stateSelect={true}
            itemSelect={(v) => {
              if (room == null || room.id != v.id) {
                onValueChange('room', v)
                handleModalRoom(false)
              }
            }}
            items={room == null ? [] : [room.id]}
          />
        </ModalSelectComponent>
      }
      {/* MODAL PARA LA TARIFA */}
      {
        modalRate &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Tarifas'
          opendrawer={modalRate}
          handleDrawer={handleModalRate}
        >
          <RateTable
            stateSelect={true}
            itemSelect={(v) => {
              if (rate == null || rate.id != v.id) {
                onValueChange('rate', v)
                handleModalRate(false)
              }
            }}
            items={rate == null ? [] : [rate.id]}
          />
        </ModalSelectComponent>
      }

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Producto' : `${item.room.name}-${item.rate.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentAutoCompleteSelect
                  options={days.days}
                  label="Días"
                  value={day}
                  onChange={(values) => onArrayChange('day', values)}
                  error={!!dayValid && formSubmitted}
                  helperText={formSubmitted ? dayValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInputSelect
                  label={hour_range != null ? 'Rango de horas' : ''}
                  title={hour_range != null ? `${hour_range.time} Hrs` : 'Rango de horas'}
                  onPressed={() => handleModalHourRange(true)}
                  error={!!hour_rangeValid && formSubmitted}
                  helperText={formSubmitted ? hour_rangeValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInputSelect
                  label={room != null ? 'Ambiente' : ''}
                  title={room != null ? room.name : 'Ambiente'}
                  onPressed={() => handleModalRoom(true)}
                  error={!!roomValid && formSubmitted}
                  helperText={formSubmitted ? roomValid : ''}
                />
              </Grid><Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInputSelect
                  label={rate != null ? 'Tarifa' : ''}
                  title={rate != null ? rate.name : 'Tarifa'}
                  onPressed={() => handleModalRate(true)}
                  error={!!rateValid && formSubmitted}
                  helperText={formSubmitted ? rateValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Precio"
                  name="mount"
                  value={mount}
                  onChange={onInputChange}
                  error={!!mountValid && formSubmitted}
                  helperText={formSubmitted ? mountValid : ''}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">
              {item == null ? 'CREAR' : 'EDITAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
