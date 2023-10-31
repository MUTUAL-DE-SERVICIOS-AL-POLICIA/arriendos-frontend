import { useRentalStore } from "@/hooks"
import { Button, Grid } from "@mui/material"
import { Box } from "@mui/system"

interface Props {
  rental: number;
}

export const Concluded = (props: Props) => {

  const {
    rental
  } = props

  const { postWarrantyReturn } = useRentalStore()

  const warrantyReturn = async () => {
    const body = {
      rental: rental,
    }
    await postWarrantyReturn(body)
  }

  return (
    <Box>
      <Grid container sx={{ padding: '20px 20px' }}>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" onClick={warrantyReturn}>
            Devolver Garantía
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained">
            Imprimir Actas
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained">
            Imprimir Nota
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}