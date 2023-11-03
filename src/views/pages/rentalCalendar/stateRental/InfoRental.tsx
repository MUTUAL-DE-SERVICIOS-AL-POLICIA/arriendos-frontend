import { ComponentButton, ComponentDate, ItemPaper } from "@/components";
import { ContactModel, EventsCalendarModel, ProductRentalModel, RentalModel } from "@/models";
import { Grid, Typography } from '@mui/material';
import { formatDate, getDateJSON, virifyDate } from "@/helpers";
import { useLeasesStates, useRentalStore } from "@/hooks";
import { format } from "date-fns";
import esES from 'date-fns/locale/es';
import { useState } from "react";
import Swal from "sweetalert2";
import { Print } from "@mui/icons-material";


interface cardProps {
  product: ProductRentalModel;
  isPlan: boolean;
  showEdit: boolean;
  rental: number;
}
export const CardEvent = (props: cardProps) => {
  const {
    product,
    isPlan,
    showEdit,
    rental
  } = props;
  const { patchUpdateTime } = useLeasesStates();
  const { postPrintDeliveryForm } = useRentalStore()
  const [loading, setLoading] = useState(false)

  const handleUpdateTime = (start: Date, end: Date) => {
    patchUpdateTime(product.id, {
      start_time: getDateJSON(start),
      end_time: getDateJSON(end)
    });
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={isPlan ? 12 : 6}>
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
        </Grid>
        <Grid item xs={12} sm={isPlan ? 12 : 6}>
          {
            showEdit &&
            <>
              <ComponentDate
                title={'Nueva fecha'}
                date={formatDate(product.start_time)}
                timeAdd={product.hour_range}
                onSave={handleUpdateTime}
              />
              <ComponentButton
                onClick={() => printDeliveryForm(rental, product.id)}
                text={'Imprimir Acta'}
                sx={{ height: "35px", width: "90%", margin: "2px 10px" }}
                loading={loading}
                startIcon={<Print />}
              />
            </>
          }
        </Grid>
      </Grid>
    </ItemPaper>
  )
}

interface infoProps {
  date: Date;
  productId: number;
  rental: RentalModel;
  selectedEvent: EventsCalendarModel;
}
export const InfoRental = (props: infoProps) => {
  const {
    date,
    productId,
    rental,
    selectedEvent
  } = props;


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography ><b>Datos del Alquiler:</b></Typography>
        <ItemPaper elevation={0} sx={{ m: 0, p: 0.5 }}>
          <Typography color="text.primary" gutterBottom sx={{ fontSize: '0.8rem' }}>
            <b>Cliente:</b> {`${rental.customer.institution_name ?? rental.customer.contacts[0].name}`}
          </Typography>
          <Typography color="text.primary" gutterBottom sx={{ fontSize: '0.8rem' }}>
            <b>Nit:</b> {`${rental.customer.nit ?? rental.customer.contacts[0].ci_nit}`}
          </Typography >
          {
            !rental.customer.institution_name ? <Typography color="text.primary" gutterBottom sx={{ fontSize: '0.8rem' }}>
              <b>Teléfono:</b> {`${rental.customer.institution_name ?? rental.customer.contacts[0].phone}`}
            </Typography> :
              <>
                <Typography sx={{ fontSize: '0.8rem' }}><b>Contactos:</b></Typography>
                <div style={{ maxHeight: `${120}px`, overflowY: 'auto' }}>
                  {
                    rental.customer.contacts
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
      </Grid>
      <Grid item xs={12} sm={rental.products.length == 1 ? 8 : 4} style={{ padding: '5px' }}>
        <Typography><b>Evento seleccionado:</b></Typography>
        <CardEvent
          rental={selectedEvent.rental}
          product={rental.products.filter((product: ProductRentalModel) => product.id == productId)[0]}
          isPlan={rental.products.length !== 1}
          showEdit={virifyDate(date)}
        />
      </Grid>
      {
        rental.products.length > 1 &&
        <Grid item xs={12} sm={4} style={{ padding: '5px' }}>
          <Typography><b>Otros eventos:</b></Typography>
          <div style={{ maxHeight: `${190}px`, overflowY: 'auto' }}>
            {
              rental.products.map((product: ProductRentalModel) => {
                if (product.id != productId) {
                  return (
                    <CardEvent
                      rental={selectedEvent.rental}
                      key={product.id}
                      product={product}
                      isPlan={rental.products.length !== 1}
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