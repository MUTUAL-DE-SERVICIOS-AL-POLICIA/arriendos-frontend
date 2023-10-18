import { useDispatch, useSelector } from "react-redux"
import { coffeApiKevin } from "@/services";
import { setCurrentLeaseState, setLeaseState } from '@/store';

const api = coffeApiKevin;

export const useLeasesStates = () => {
    const { leaseStates, currentLeaseState } = useSelector((state: any) => state.leaseStates)
    const dispatch = useDispatch()

    const getLeaseState = async () => {
        const { data } = await api.get(`/leases/list_state/`)
        dispatch(setLeaseState({ leaseStates: data }))
    }
    const getCurrentLeaseState = async (rental: number) => {
        console.log(rental)
        const { data } = await api.get(`/leases/get_state/`, {
            params: {
                rental: rental
            }
        })
        console.log(data)
        return data;
        //dispatch(setCurrentLeaseState({ currentLeaseState: data }))
    }

    return {
        leaseStates,
        currentLeaseState,
        getLeaseState,
        getCurrentLeaseState
    }
}