import { useForm, useRoomStore } from "@/hooks";
import { useCallback, useState } from "react";
import { CartSelectedProduct } from ".";
import { ComponentSelect, ModalSelectComponent } from "@/components";
import { FormRentalModel } from "@/models";
import { PropertieTable } from "../properties";
import { CalendarComponent } from "./calendar";
import { styled } from '@mui/system';

const formFields: FormRentalModel = {
  room: null
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
  width: 0%;
`;


export const RentalView = () => {

  const { room, onInputChange, onResetForm } = useForm(formFields);
  const { RoomSelection = {}, selectRoom, deselectRoom } = useRoomStore();

  // Modal =================================================
  const [modal, setModal] = useState(false);
  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);
  // =======================================================

  // Expansión =============================================
  const [ selected, setSelected ] = useState(Array<boolean>);
  const [ numberSelected, setNumberSelected ] = useState(0);
  const toggleExpanded = ( isSelected: boolean ) => {
    let newExpanded: Array<boolean> = [];
    if(isSelected) {
      newExpanded = [...selected, isSelected];
    } else {
      selected.pop();
      newExpanded = selected;
    }
    setSelected(newExpanded);
    if(newExpanded.length == 0) setNumberSelected(0);
    else setNumberSelected(newExpanded.length)
  };
  //  ======================================================


  return (
    <>
      { modal ? <ModalSelectComponent
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
                 </ModalSelectComponent>
        : <></>
      }
      <Container>
        <SliderCalendar style={{ width: numberSelected != 0 ? '70%' : '100%'}}>
            <ComponentSelect
              label={room != null ? 'Ambiente' : ''}
              labelChip={['name']}
              title={room != null ? room : 'Ambiente'}
              onPressed={() => handleModal(true)}
              error={false}
              helperText={''}
            />
            <CalendarComponent
              select={Object.keys(RoomSelection).length != 0}
              onSelect={ ( isSelected : boolean ) => toggleExpanded(isSelected)}
            />
        </SliderCalendar >
        <SliderContent>
            <CartSelectedProduct />
        </SliderContent>
      </Container>
    </>
  )
}
