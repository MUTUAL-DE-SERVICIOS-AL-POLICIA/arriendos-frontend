import { useRentalStore } from "@/hooks"
import { Button, Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react";

const dividerStyle = {
  height: '2px',
  width: '70%',
  marginBottom: '15px',
  backgroundColor: '#085',
}
interface Props {
  rental: number;
}

export const Concluded = (props: Props) => {

  const {
    rental
  } = props

  const { postWarrantyReturn, getPrintWarrantyReturn } = useRentalStore()
  const [ disabled, setDisabled ] = useState(true)

  const warrantyReturn = async () => {
    const body = {
      rental: rental,
    }
    await postWarrantyReturn(body)
  }

  const printWarrantyRequest = async () => {
    const res = await getPrintWarrantyReturn(rental)
    if(res) setDisabled(!res)
  }

  return (
    <Box>
      <Grid container sx={{ padding: '20px 20px' }}>
        <Grid item xs={12} sm={7}>
          <Typography>Imprimir formulario de solicitud de garantía:</Typography>
        </Grid>
        <Grid item xs={12} sm={5} sx={{marginBottom: 2}}>
          <Button onClick={printWarrantyRequest} variant="contained">
            IMPRIMIR
          </Button>
        </Grid>
        <Divider style={dividerStyle}/>
        <Grid item xs={12} sm={7}>
          <Typography>Devolver garantía:</Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
        <Button disabled={disabled} onClick={warrantyReturn} variant="contained">
            IMPRIMIR
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}