import { getMessagesES, localizer } from "@/helpers";
import { CalendarEvent } from ".";
import { useRentalStore } from "@/hooks";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';
import { Paper } from "@mui/material";
import { format } from "date-fns";


const groupEventsByDate = (events: any[], date: Date) => {
  return events.filter((event: any) => {
    const dateCurrent = format(date, 'yyyy-MM-dd');
    const start = format(event.start, 'yyyy-MM-dd');
    const end = format(event.end, 'yyyy-MM-dd');
    if (dateCurrent == start || dateCurrent == end) {
      return event
    }
  });
}

const sameDay = (d1: any, d2: any) => {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

interface calendarProps {
  onEvents: (listSelected: any[]) => void;
  daySelect: Date | null;
  onSelectDay: (day: Date | null) => void;
  screenHeight: number;
}


export const CalendarComponent = (props: calendarProps) => {
  const {
    onEvents,
    daySelect,
    onSelectDay,
    screenHeight,
  } = props;

  const { rentals = [] } = useRentalStore()

  const calendarStyle = (date: any) => {
    if (daySelect != null && sameDay(daySelect, date)) {
      return 'selected-day';
    }
    return null;
  };

  const onSelectSlot = async (slotInfo: any) => {
    if (daySelect == null) {
      onSelectDay(slotInfo.start)
      onEvents(groupEventsByDate(rentals, slotInfo.start))
    } else {
      if (sameDay(daySelect, slotInfo.start)) {
        onSelectDay(null);
        onEvents([])
      } else {
        onSelectDay(slotInfo.start)
        onEvents(groupEventsByDate(rentals, slotInfo.start))
      }
    }
  };


  return (
    <Paper sx={{ padding: '16px', borderRadius: '10px' }}>
      <Calendar
        culture='es'
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: `${screenHeight - 150}px`, cursor: 'pointer' }}
        messages={getMessagesES()}
        dayPropGetter={(date: any) => {
          return { className: calendarStyle(date) as string };
        }}
        eventPropGetter={() => {


          return {
            style: {
              backgroundColor: '#a7e8d8',
              color: '#000',
              opacity: 0.8,
              display: 'block',
              fontSize: '0.9rem'
            },
          };
        }}
        components={{
          event: CalendarEvent
        }}
        onSelectSlot={onSelectSlot}
        selectable={true}
        events={rentals}
      />
    </Paper>
  )
}
