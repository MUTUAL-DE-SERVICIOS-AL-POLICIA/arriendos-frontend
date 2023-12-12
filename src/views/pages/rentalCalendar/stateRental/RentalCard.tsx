import { Chip, Grid, Grow, List, Paper, Stack, Typography } from "@mui/material"
import { CalendarIcon } from "@mui/x-date-pickers"
import { format } from "date-fns";
import esES from 'date-fns/locale/es';
import { useState } from "react";
import { EventDialog } from "./EventDialog";
import { EventsCalendarModel } from "@/models";
import { useRentalStore } from "@/hooks";

interface cardProps {
  screenHeight: number;
  showGrow: boolean;
  date: Date;
}

export const RentalCard = (props: cardProps) => {
  const {
    screenHeight,
    showGrow,
    date,
  } = props;

  const [openDialog, setOpenDialog] = useState(false)
  // const [selectedEvent, setSelectedEvent] = useState<EventsCalendarModel | null>(null)
  const { groupRentals, saveRentalSelected } = useRentalStore();

  const handleDialog = (value: boolean, event: EventsCalendarModel | null) => {
    saveRentalSelected(event!)
    setOpenDialog(value)
  }


  return (
    <>
      <Typography variant="h6" style={{ textAlign: 'center' }}>Alquileres creados</Typography>
      <Grow in={true} style={{ transformOrigin: '0 0 0 0' }} {...(showGrow ? { timeout: 2300 } : {})}>
        <Paper sx={{ padding: '6px 0px', borderRadius: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            {date && <Chip
              label={format(date, 'EEEE dd-MMMM-yyyy', { locale: esES })}
              icon={<CalendarIcon />}
              sx={{ backgroundColor: '#DEA427' }}
            />}
          </div>
          <div style={{ maxHeight: `${screenHeight / 3.5}px`, overflowY: 'auto' }}>
            <List sx={{ width: '100%' }}>
              {groupRentals.map((event: EventsCalendarModel, index: number) => (
                <Paper
                  key={index}
                  elevation={5}
                  sx={{ marginBottom: 1, mx: 2, cursor: 'pointer' }}
                  onClick={() => handleDialog(true, event)}>
                  <Stack
                    sx={{ p: 1.5 }}
                    direction="column">
                    <Grid container justifyContent="space-between">
                      <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: 900 }}>
                          {event.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography sx={{ fontWeight: 550 }}>
                          {event.name_state}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                    >
                      {`Inicio: ${format(event.start, 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}
                    </Typography>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                    >
                      {`Fin: ${format(event.end, 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </List>
          </div>
        </Paper>
      </Grow>
      {
        openDialog && <EventDialog
          open={openDialog}
          handleClose={() => handleDialog(false, null)}
          date={date}
        />
      }
    </>
  )
}
