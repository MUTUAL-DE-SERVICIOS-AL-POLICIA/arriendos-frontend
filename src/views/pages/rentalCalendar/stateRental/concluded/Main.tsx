import { ComponentButton } from "@/components";
import { /*useLeasesStates,*/ useRentalStore } from "@/hooks"
import { /*KeyboardReturn,*/ Print } from "@mui/icons-material";
import { Divider, Grid, Typography } from "@mui/material"
import { Box, /*Stack*/ } from "@mui/system"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Dispatch, SetStateAction, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from 'dayjs';

const dividerStyle = {
  height: '2px',
  width: '70%',
  marginBottom: '15px',
  backgroundColor: '#085',
}

interface Props {
  rental: number,
  handleClose: () => void,
  dateSelected: Dispatch<SetStateAction<Date | null>>
  newDate: Date | null
}

export const Concluded = (props: Props) => {
  const { /*rental, handleClose,*/ dateSelected, newDate } = props
  const { rentalSelected, /*postWarrantyReturn,*/ getPrintWarrantyReturn, getPrintReturnWarrantyForm } = useRentalStore()
  const [disabled, setDisabled] = useState(true)
  const [loadingPrint, setLoadingPrint] = useState(false)
  // const [/*loadingWarrantyReturn,*/ setLoadingWarrantyReturn] = useState(false)
  const [loadingPrintReturn, setLoadingPrintReturn] = useState(false)
  // const [newDate, setNewDate] = useState<Date | null>(null);

  // const { currentRentalState, postChangeRentalState } = useLeasesStates()

  // const warrantyReturn = async () => {
  //   setLoadingWarrantyReturn(true)
  //   const date = dayjs(newDate)
  //   const formatDate = date.toISOString()
  //   const body = {
  //     return_date: formatDate,
  //     rental: rentalSelected.rental,
  //   }
  //   await postWarrantyReturn(body)
  //   setLoadingWarrantyReturn(false)

  //   let nextStateId = null;
  //   let minimumDifference = Infinity;
  //   currentRentalState.next_states.forEach((nextState: any) => {
  //     const difference = Math.abs(currentRentalState.current_state.id - nextState.id);
  //     if (difference < minimumDifference) {
  //       minimumDifference = difference;
  //       nextStateId = nextState.id;
  //     }
  //   });
  //   const changeRentalState = {
  //     rental: rental,
  //     state:  nextStateId
  //   }
  //   await postChangeRentalState(changeRentalState)
  //   handleClose()
  // }

  const printWarrantyRequest = async () => {
    setLoadingPrint(true)
    const res = await getPrintWarrantyReturn(rentalSelected.rental)
    if (res) {
      setDisabled(res => res ? !res : res)
    }
    setLoadingPrint(false)
  }

  const printWarrantyReturn = async () => {
    setLoadingPrintReturn(true)
    await getPrintReturnWarrantyForm(rentalSelected.rental)
    setLoadingPrintReturn(false)
  }

  return (
    <Box>
      <Grid container sx={{ padding: '20px 20px' }}>
        <Grid item xs={12} sm={7}>
          <Typography>Imprimir formulario de solicitud de garantía:</Typography>
        </Grid>
        <Grid item xs={12} sm={5} sx={{ marginBottom: 2 }}>
          <ComponentButton
            onClick={printWarrantyRequest}
            text="IMPRIMIR"
            startIcon={<Print />}
            loading={loadingPrint}
          />
        </Grid>
        <Divider style={dividerStyle} />
        <Grid item xs={12} sm={7}>
          <Typography>Imprimir conformidad:</Typography>
        </Grid>
        <Grid item xs={12} sm={5} sx={{ marginBottom: 2 }}>
          <ComponentButton
            onClick={printWarrantyReturn}
            text="IMPRIMIR"
            startIcon={<Print />}
            disable={disabled}
            loading={loadingPrintReturn}
          />
        </Grid>
        <Divider style={dividerStyle} />
        <Grid item xs={12} sm={5}>
          <Typography>Devolver garantía:</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{paddingRight: 0}}>
          {/* <Stack direction="row" alignContent="right" alignItems="right" sx={{marginRight: 0, paddingRight: 0}}> */}
            <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
              <DatePicker
                value={newDate}
                label={"Fecha de devolución"}
                onChange={dateSelected}
                slotProps={{
                  popper: {
                    sx: {
                      zIndex: 9999
                    }
                  },
                }}
                sx={{
                  display: 'flex',
                  width: '18.5em',
                  height: '1px',
                  '& label.Mui-focused': {
                    color: 'black',
                  },
                  '& label:not(.Mui-focused)': {
                    color: 'black',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    height: 'fit-content',
                    '& fieldset': { borderColor: '#2F3746' },
                    '&:hover fieldset': { borderColor: '#0B815A' },
                  },
                }}
              />
            </LocalizationProvider>
            {/* <ComponentButton
              onClick={warrantyReturn}
              text="DEVOLVER"
              startIcon={<KeyboardReturn />}
              disable={disabled}
              loading={loadingWarrantyReturn}
              color={`warning`}
            /> */}
          {/* </Stack> */}
        </Grid>
      </Grid>
    </Box>
  )
}