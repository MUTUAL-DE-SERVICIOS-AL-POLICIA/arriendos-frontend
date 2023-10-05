import { useEffect, useState } from "react";
import { getMessagesES, localizer } from "@/helpers";
import { CalendarEvent } from ".";
import { useProductStore, useSelectedProductStore } from "@/hooks";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import './styles.css';
import { Paper } from "@mui/material";

function sameDay(d1: any, d2: any) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

interface calendarProps {
  select: boolean;
  onSelect: (isSelected: boolean, daySelected: Date) => void;
  onEvents: (listSelected: []) => void;
}

export const CalendarComponent = (props: calendarProps) => {
  const {
    select,
    onSelect,
    onEvents,
  } = props
  const { selectedProducts, setSelectedProduct, removeProducts } = useSelectedProductStore();
  const [lastView, setLastView] = useState('month');
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const { leases = [], getLeases } = useProductStore()

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  useEffect(() => {
    getLeases();
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

    const dateEntry = new Date(slotInfo.start).toISOString().split('T')[0]
    const grouped = leases.reduce((accumulator:any, currentValue:any) => {
      const index = new Date(currentValue.start)
      const date = index.toISOString().split('T')[0]
      if(!accumulator[date]) {
        accumulator[date] = []
      }
      accumulator[date].push(currentValue)
      return accumulator
    }, {})

    // console.log(dateEntry)
    // console.log(grouped[dateEntry])
    grouped[dateEntry] ? onEvents(grouped[dateEntry]) : onEvents([])

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
    <Paper sx={{ padding: '15px', borderRadius: '10px' }}>
      <Calendar
        culture='es'
        localizer={localizer}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: `${screenHeight - 150}px`, cursor: 'pointer' }}
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
