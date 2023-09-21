import { useForm, useRoomStore } from "@/hooks";
import { Grid, Typography } from "@mui/material"
import { useCallback, useState } from "react";
import { CartSelectedProduct } from ".";
import { ComponentSelect, ModalSelectComponent } from "@/components";
import { FormRentalModel } from "@/models";
import { PropertieTable } from "../properties";
import { CalendarComponent } from "./calendar";


const formFields: FormRentalModel = {
  room: null
}

export const RentalView = () => {

  const { room, onInputChange, onResetForm } = useForm(formFields);

  const [modal, setModal] = useState(false);
  const { RoomSelection = {}, selectRoom, deselectRoom } = useRoomStore();
  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);

  return (
    <>
      {
        modal ?
          <ModalSelectComponent
            stateSelect={true}
            stateMultiple={false}
            title='Ambientes'
            opendrawer={modal}
            handleDrawer={() => handleModal(false)}
          >
            <PropertieTable
              stateSelect={true}
              itemSelect={(v) => {
                if (RoomSelection.id == v.id) {
                  deselectRoom();
                  onResetForm();
                } else {
                  selectRoom(v);
                  onInputChange({ target: { name: 'room', value: v.name } });
                }
                handleModal(false)
              }}
            />
          </ModalSelectComponent> :
          <></>
      }
      <Typography variant="h6">Arriendos</Typography>
      <Grid container>
        <Grid item xs={12} sm={7} >
          <div style={{ padding: '10px' }}>
            <ComponentSelect
              label={room != null ? 'Ambiente' : ''}
              labelChip={['name']}
              title={room != null ? room : 'Ambiente'}
              onPressed={() => handleModal(true)}
              error={false}
              helperText={''}
            />
            <CalendarComponent select={Object.keys(RoomSelection).length != 0} />
          </div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <CartSelectedProduct />
        </Grid>
      </Grid>
    </>
  )
}
