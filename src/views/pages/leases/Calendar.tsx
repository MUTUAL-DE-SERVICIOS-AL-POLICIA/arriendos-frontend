import { useState } from "react";
import { getMessagesES, localizer } from "@/helpers";
import { CalendarEvent } from ".";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarComponent = () => {
    const [lastView, setLastView] = useState('month');
    const eventStyleGetter = (event: any, start: any, end: any, isSelected: any) => {

        let newStyle = {
            backgroundColor: "#347CF7",
            color: 'white',
        };

        if (event.isMine) {
            newStyle.backgroundColor = "lightgreen"
        }

        return {
            className: "",
            style: newStyle
        };
    }
    return (
        <Calendar
            culture='es'
            localizer={localizer}
            // events={[...events.filter(e => e.state).map(({ start, end, ...rest }) =>
            // ({
            //     start: new Date(start),
            //     end: new Date(end),
            //     ...rest
            // }))
            //     .filter((e) => categorySelect === 'todos' ? true : e.categoryIds.map(e => e.id).includes(categorySelect))
            // ]}
            defaultView={lastView}
            startAccessor="start"
            endAccessor="end"
            // style={{ height: 'calc( 100vh - 100px )', width: 'calc( 100vh - 80px )' }}
            style={{ height: '100vh'}}
            messages={getMessagesES()}
            eventPropGetter={eventStyleGetter}
            components={{
                event: CalendarEvent
            }}
            onSelectEvent={() => { }}
            onView={setLastView}
            xs={12} sm={12}
        />
    )
}
