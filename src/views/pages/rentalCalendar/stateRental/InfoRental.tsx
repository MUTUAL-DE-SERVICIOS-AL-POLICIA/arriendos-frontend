import { ComponentButton, ComponentDate, ItemPaper } from "@/components";
import { ContactModel, ProductRentalModel } from "@/models";
import { Grid, Typography } from '@mui/material';
import { formatDate, virifyDate } from "@/helpers";
import { useLeasesStates, useRentalStore } from "@/hooks";
import { format } from "date-fns";
import esES from 'date-fns/locale/es';
import { useState } from "react";
import Swal from "sweetalert2";
import { Cancel, Print } from "@mui/icons-material";


interface cardProps {
  product: ProductRentalModel;
  showEdit: boolean;
  rental: number;
}
export const CardEvent = (props: cardProps) => {
  const {
    product,
    showEdit,
    rental,
  } = props;
  const { currentRentalState, patchUpdateTime } = useLeasesStates();
  const { postPrintDeliveryForm } = useRentalStore();

  const [loading, setLoading] = useState(false);
  const [loadingChangeTime, setLoadingChangeTime] = useState(false);

  const handleUpdateTime = async (start: Date, end: Date) => {
    setLoadingChangeTime(true);
    await patchUpdateTime(product.id, { start, end });
    setLoadingChangeTime(false);
  }

  const printDeliveryForm = async (rental: number, product: number) => {
    setLoading(true)
    const body = {
      rental,
      product
    }
    if (!await postPrintDeliveryForm(body))
      Swal.fire("Error", "Hubo un error", "error")
    setLoading(false)
  }

  return (
    <ItemPaper key={product.id} elevation={0} sx={{ mx: 0, my: .5, px: 0.5 }}>
      <Typography sx={{ fontSize: '0.8rem' }}>
        <b>Evento:</b> {`${product.event}`}
      </Typography>
      <Typography sx={{ fontSize: '0.8rem' }}>
        <b>Lugar:</b> {`${product.property}-${product.room}`}
      </Typography>
      <Typography sx={{ fontSize: '0.8rem' }}>
        <b>Fecha inicial:</b> {`${format(formatDate(product.start_time), 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}
      </Typography>
      <Typography sx={{ fontSize: '0.8rem' }}>
        <b>Fecha Fin:</b> {`${format(formatDate(product.end_time), 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}
      </Typography>
      {
        product.detail !== '' &&
        <Typography sx={{ fontSize: '0.8rem' }}>
          <b>Detalle:</b> {`${product.detail}`}
        </Typography>
      }
      {
        showEdit &&
        <>
          {
            (currentRentalState.current_state.id == 1 || currentRentalState.current_state.id == 2) && <ComponentDate
              title={'Nueva fecha'}
              date={formatDate(product.start_time)}
              timeAdd={product.hour_range}
              onSave={handleUpdateTime}
              loading={loadingChangeTime}
            />}
          {
            currentRentalState.current_state.id == 2 && <ComponentButton
              onClick={() => printDeliveryForm(rental, product.id)}
              text={'Imprimir Acta'}
              sx={{ height: "35px", width: "90%", margin: "2px 10px" }}
              loading={loading}
              startIcon={<Print />}
            />}
        </>
      }
    </ItemPaper>
  )
}

interface infoProps {
  date: Date;
}
export const InfoRental = (props: infoProps) => {
  const {
    date,
  } = props;

  const { rentalInformation, currentRentalState, postChangeRentalState } = useLeasesStates();
  const { rentalSelected } = useRentalStore();
  const stoppedAction = async () => {
    const { value: text } = await Swal.fire({
      title: '¿Está seguro de esta acción?',
      text: `Esta acción no es reversible`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0B815A',
      confirmButtonText: 'Anular',
      cancelButtonColor: '#F04438',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      input: "textarea",
      inputPlaceholder: "Escribe el motivo de la anulación del alquiler",
      inputValidator: (value) => {
        if (!value) {
          return "Es necesario agregar el motivo";
        }
      },
      customClass: {
        input: 'custom-textarea',
      }
    });
    if (text) {
      try {
        const changeRentalState = {
          rental: rentalSelected.rental,
          state: currentRentalState.next_states.find((e: any) => e.id != currentRentalState.current_state.id + 1).id,
          reason: text
        }
        await postChangeRentalState(changeRentalState)
        Swal.fire(
          `¡Listo!`,
          'Acción realizada con exito',
          'success'
        )
        // handleClose()
      } catch (error: any) {
        throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
      }
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography ><b>Datos del Alquiler:</b></Typography>

        <ItemPaper elevation={0} sx={{ m: 0, p: 0.5 }}>
          <Typography color="text.primary" gutterBottom sx={{ fontSize: '0.8rem' }}>
            <b>Cliente:</b> {`${rentalInformation.customer.institution_name ?? rentalInformation.customer.contacts[0].name}`}
          </Typography>
          <Typography color="text.primary" gutterBottom sx={{ fontSize: '0.8rem' }}>
            <b>Nit:</b> {`${rentalInformation.customer.nit ?? rentalInformation.customer.contacts[0].ci_nit}`}
          </Typography >
          {
            !rentalInformation.customer.institution_name ? <Typography color="text.primary" gutterBottom sx={{ fontSize: '0.8rem' }}>
              <b>Teléfono:</b> {`${rentalInformation.customer.institution_name ?? rentalInformation.customer.contacts[0].phone}`}
            </Typography> :
              <>
                <Typography sx={{ fontSize: '0.8rem' }}><b>Contactos:</b></Typography>
                <div style={{ maxHeight: `${120}px`, overflowY: 'auto' }}>
                  {
                    rentalInformation.customer.contacts
                      .map((contact: ContactModel) => (
                        <ItemPaper key={contact.ci_nit} elevation={2} sx={{ margin: '7px' }}>
                          <Typography sx={{ fontSize: '0.8rem' }}>
                            <b>Nombre:</b> {`${contact.name}`}
                          </Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>
                            <b>CI o NIT:</b> {`${contact.ci_nit}`}
                          </Typography>
                          <Typography sx={{ fontSize: '0.8rem' }}>
                            <b>Teléfono:</b> {`${contact.phone}`}
                          </Typography>
                        </ItemPaper>
                      ))
                  }
                </div>
              </>
          }
        </ItemPaper>
        {(currentRentalState.current_state.id == 1 || currentRentalState.current_state.id == 2) && <ComponentButton
          text={'ANULAR'}
          onClick={stoppedAction}
          variant={'outlined'}
          endIcon={<Cancel />}
          sx={{ mr: 1, color: 'red', borderColor: 'red', '&:hover': { backgroundColor: '#fadad9', borderColor: 'red' } }}
        />
        }
      </Grid>
      <Grid item xs={12} sm={rentalInformation.products.length == 1 ? 8 : 4} style={{ padding: '5px' }}>
        <Typography><b>Evento seleccionado:</b></Typography>
        {rentalSelected && <CardEvent
          rental={rentalSelected.rental}
          product={rentalInformation.products.filter((product: ProductRentalModel) => product.id == rentalSelected.product_id)[0]}
          showEdit={virifyDate(date)}
        />
        }
      </Grid>
      {
        rentalInformation.products.length > 1 &&
        <Grid item xs={12} sm={4} style={{ padding: '5px' }}>
          <Typography><b>Otros eventos:</b></Typography>
          <div style={{ maxHeight: `${190}px`, overflowY: 'auto' }}>
            {
              rentalInformation.products.map((product: ProductRentalModel) => {
                if (product.id != rentalSelected.product_id) {
                  return (
                    <CardEvent
                      rental={rentalSelected.rental}
                      key={product.id}
                      product={product}
                      showEdit={false}
                    />
                  )
                }
              })
            }
          </div>
        </Grid>
      }
    </Grid>
  )
}