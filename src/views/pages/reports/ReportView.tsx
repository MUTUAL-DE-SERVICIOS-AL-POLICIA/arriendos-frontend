import { ComponentInputSelect, ModalSelectComponent } from "@/components"
import { useReportStore } from "@/hooks/useReportStore"
import { Download } from "@mui/icons-material"
import { Button, Grid, Stack, SvgIcon } from "@mui/material"
import { useCallback,  useState } from "react"
import { StateTable } from "."
import { useForm } from "@/hooks"
import { ComponentDateWithoutTime } from "@/components/DateWithoutTime"
import dayjs from 'dayjs';

const formFields = {
  state: null,
}

export const ReportView = () => {

  const {
    state, stateValid,
    onValueChange, formSubmitted
  } = useForm(formFields)

  var bodyFormData = new FormData();

  const [ modalState, setModalState ] = useState(false)
  const { getReportXlsx } = useReportStore()

  const [ since, setSince ] = useState(null)
  const [ until, setUntil ] = useState(null)

  const handleModalStateType = useCallback((value: boolean) => {
    setModalState(value)
  }, [])

  const getDocument = () => {
    const start_date = dayjs(since).startOf('day').hour(0).minute(0).second(0).toISOString();
    const end_date = dayjs(until).endOf('day').hour(23).minute(59).second(59).toISOString();
    bodyFormData.append("start_date", start_date!)
    bodyFormData.append("end_date", end_date!)
    bodyFormData.append("state", state.id)
    getReportXlsx(bodyFormData)
  }

  const exists = () => {
    return !( state && Object.keys(state).length != 0 && since && until)
  }

  return (
    <>
      {
        modalState &&
        <ModalSelectComponent
          stateSelect={true}
          title='Estados'
          opendrawer={modalState}
          handleDrawer={handleModalStateType}
        >
          <StateTable
            stateSelect={true}
            itemSelect={(v) => {
              if(state == null || state.id != v.id) {
                onValueChange('state', v)
                handleModalStateType(false)
              }
            }}
            items={state == null ? [] : [state.id]}
          />
        </ModalSelectComponent>
      }
      <Stack direction="row" justifyContent="end">
        <Button
          onClick={() => getDocument()}
          startIcon={<SvgIcon fontSize="small"><Download /></SvgIcon>}
          variant="contained"
          disabled={exists()}
        >
          Descargar
        </Button>
      </Stack>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
          <ComponentInputSelect
            label={state != null ? 'Estado' : ''}
            title={state != null ? state.name : 'Estado'}
            onPressed={() => handleModalStateType(true)}
            error={!!stateValid && formSubmitted}
            helperText={formSubmitted ? stateValid : ''}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
          <ComponentDateWithoutTime
            label="desde"
            value={since}
            onChange={setSince}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
          <ComponentDateWithoutTime
            label="hasta"
            value={until}
            onChange={setUntil}
          />
        </Grid>
      </Grid>
    </>
  )
}