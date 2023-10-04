import { useEffect, useState } from "react";
import { getMessagesES, localizer } from "@/helpers";
import { CalendarEvent } from ".";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelectedProductStore } from "@/hooks";

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

export const CalendarComponent = ({ select, onSelect }: { select: boolean, onSelect: any }) => {

  const { selectedProducts, setSelectedProduct, unsetSElectedProduct, removeProducts } = useSelectedProductStore();
  const [lastView, setLastView] = useState('month');
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
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

    // const currentDate = new Date();
    // const selectedDate = slotInfo.start;
    // if (noClickable(selectedDate, currentDate)) return;

    // if (selectedProducts.map((e: any) => e.start.getTime()).includes(slotInfo.start.getTime())) {
    //   onSelect(false) // desmarcar
    //   unsetSElectedProduct(slotInfo);
    // } else {
    //   onSelect(true) // marcar
    //   setSelectedProduct(slotInfo);
    // }

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
      />
    </Paper>
  )
}
