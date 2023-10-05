import { useEffect, useState } from "react";
import { getMessagesES, localizer } from "@/helpers";
import { CalendarEvent } from ".";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useProductStore, useSelectedProductStore } from "@/hooks";


import './styles.css';
import { Paper } from "@mui/material";
import { setLeases } from "@/store";
import { el } from "date-fns/locale";

function sameDay(d1: any, d2: any) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

export const CalendarComponent = ({ select, onSelect }: { select: boolean, onSelect: any }) => {

  const { selectedProducts, setSelectedProduct, removeProducts } = useSelectedProductStore();
  const [lastView, setLastView] = useState('month');
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const { leases = [], getLeases, setLeasesReload } = useProductStore()

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  useEffect(() => {
    getLeases().then((data) => {
      let i = 0;
      const events:any = []
      data.forEach((element:any) => {
        const event:any = {}
        event.id = i
        event.title = element.event_type_name
        event.allDay = true
        event.start = new Date(element.start_time)
        event.end = new Date(element.end_time)
        events.push(event)
        i++
      });
      setLeasesReload(events)
    })
  }, [])

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
        events={leases}
      />
    </Paper>
  )
}
