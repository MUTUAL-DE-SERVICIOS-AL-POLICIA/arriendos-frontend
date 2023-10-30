import { ComponentInput } from "@/components"
import { AttachMoney } from "@mui/icons-material";
import { Button, Grid } from "@mui/material"

interface Props {
  labels: Array<string>;
  values: Array<any>;
  names: Array<any>;
  actionFunction: () => void;
  onInputChange: () => void;
  errors: Array<any>;
  helperTexts: Array<any>;
}

export const PaidContent = (props: Props) => {

  const {
    labels,
    values,
    names,
    actionFunction,
    onInputChange,
    errors,
    helperTexts
  } = props

  return (
  <Grid container spacing={2} sx={{ padding: '15px 5px 50px 5px'}}>
      <Grid item xs={12} sm={6}>
        <ComponentInput
          type="text"
          label={labels[0]}
          name={names[0]}
          value={values[0]}
          onChange={onInputChange}
          error={!!errors[0]}
          helperText={helperTexts[0]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ComponentInput
          type="text"
          label={labels[1]}
          name={names[1]}
          value={values[1]}
          onChange={onInputChange}
          error={!!errors[1]}
          helperText={helperTexts[1]}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <ComponentInput
          type="text"
          label={labels[2]}
          name={names[2]}
          value={values[2] || null}
          onChange={onInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          sx={{maxWidth: '100%', height: '50px'}}
          variant="contained"
          onClick={actionFunction}
          endIcon={<AttachMoney />}
        >
          Registrar
        </Button>
      </Grid>
    </Grid>
  )
}