export const CalendarEvent = ({ event }:{event:any}) => {

    const { title } = event;

    return (
        <>
            <strong>{title}</strong>
        </>
    )
}
