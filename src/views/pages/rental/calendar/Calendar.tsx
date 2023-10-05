import { useEffect, useState } from "react";
import { getMessagesES, localizer } from "@/helpers";
import { CalendarEvent } from ".";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useProductStore, useSelectedProductStore } from "@/hooks";


import './styles.css';
import { Paper } from "@mui/material";

function sameDay(d1: any, d2: any) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

// function noClickable(selectedDate: Date, currentDate: Date) {
//   currentDate.setHours(0, 0, 0, 0);
//   selectedDate.setHours(0, 0, 0, 0);
//   return selectedDate < currentDate ?? false
// }
const events = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2023, 9, 4),
    end: new Date(2023, 9, 4),
  },
  {
    id: 1,
    title: 'Mi cumpleaños',
    allDay: true,
    start: new Date(2023, 1, 22),
    end: new Date(2023, 1, 22)
  }
]

export const CalendarComponent = ({ select, onSelect }: { select: boolean, onSelect: any }) => {

  const { selectedProducts, setSelectedProduct, unsetSElectedProduct, removeProducts } = useSelectedProductStore();
  const [lastView, setLastView] = useState('month');
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const { leases, getLeases } = useProductStore()

  useEffect(() => {
    getLeases().then((data) => {
      console.log("ejecutandose leases")
      console.log(data)
    })
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  const calendarStyle = (date: any) => {

    const isSelected = selectedProducts.some((product: any) =>
      sameDay(date, product.start)
    );
    if (isSelected) {
      return 'selected-day';
    }
    return null;
  };

  const onSelectSlot = async (slotInfo: any) => {

    if (selectedProducts.map((e: any) => e.start.getTime()).includes(slotInfo.start.getTime())) {
      removeProducts()
      onSelect(false, slotInfo.start)
    } else {
      removeProducts()
      onSelect(false, slotInfo.start)
      setSelectedProduct(slotInfo)
      onSelect(true, slotInfo.start)
    }
  };

  return (
    <Paper sx={{ padding: '15px', borderRadius: '10px'}}>
      <Calendar
        culture='es'
        localizer={localizer}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: `${screenHeight - 150}px`, cursor: 'pointer'}}
        messages={getMessagesES()}
        dayPropGetter={(date: any) => ({
          className: calendarStyle(date),
        })}
        components={{
          event: CalendarEvent
        }}
        onView={setLastView}
        onSelectSlot={onSelectSlot}
        selectable={select}
        events={events}
      />
    </Paper>
  )
}
