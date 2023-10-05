import { coffeApiKevin } from "@/services";
import { useDispatch, useSelector } from "react-redux"
import { setEvents } from '@/store';


const api = coffeApiKevin

export const useEventStore = () => {
	const { events } = useSelector((state: any) => state.events);
	const dispatch = useDispatch();

	const getEvents = async () => {
		console.log('OBTIENDO TODOS LOS EVENTOS')
		const { data } = await api.get('/leases/event/')
		console.log(data)
		dispatch(setEvents({events: data}))
		return data
	}

	return {
		events,
		getEvents
	}
}