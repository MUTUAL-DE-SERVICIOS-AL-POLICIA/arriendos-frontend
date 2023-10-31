import { Chip, Divider, Grow, List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { CalendarIcon } from "@mui/x-date-pickers"
import { format } from "date-fns";
import esES from 'date-fns/locale/es';
import React, { useState } from "react";
import { EventDialog } from "./EventDialog";
import { EventsCalendarModel } from "@/models";
// import { EventDialog } from ".";

const dividerStyle = {
  height: '1px',
  width: '90%',
  marginTop: '5px',
  marginBottom: '5px',
  backgroundColor: '#085139',
  marginLeft: '15px'
}

interface cardProps {
  screenHeight: number;
  showGrow: boolean;
  date: Date;
  events: EventsCalendarModel[]
}

export const RentalCard = (props: cardProps) => {
  const {
    screenHeight,
    showGrow,
    date,
    events,
  } = props;

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventsCalendarModel | null>(null)

  const handleDialog = (value: boolean, event: EventsCalendarModel | null) => {
    setSelectedEvent(event)
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
              {events.map((event: EventsCalendarModel, index: number) => (
                <React.Fragment key={index}>
                  <ListItem
                    sx={{ padding: '0px 10px', cursor: 'pointer' }}
                    onClick={() => handleDialog(true, event)}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Inicio:
                          </Typography>
                          {` ${format(event.start, 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}
                          <br />
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Fin:
                          </Typography>
                          {` ${format(event.end, 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}
                        </>
                      }
                    >
                    </ListItemText>

                  </ListItem>
                  {index !== events.length - 1 && <Divider style={dividerStyle} />}
                </React.Fragment>
              ))}
            </List>
          </div>
        </Paper>
      </Grow>
      {
        openDialog && <EventDialog
          open={openDialog}
          handleClose={() => handleDialog(false, null)}
          selectedEvent={selectedEvent!}
          date={date}
        />
      }
    </>
  )
}
