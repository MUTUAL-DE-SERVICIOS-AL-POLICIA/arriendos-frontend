import { usePropertieStore, useRoomStore } from "@/hooks";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Stack, SvgIcon, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RoomsView } from "../properties";
import { CalendarComponent } from ".";
import { ComponentButton } from "@/components";
import { Add } from "@mui/icons-material";
import { CreateLease } from ".";



export const LeasesView = () => {

  const { properties, getProperties } = usePropertieStore();
  const { getRooms } = useRoomStore();
  useEffect(() => {
    getProperties();
  }, []);

  const [expanded, setExpanded] = useState<number | false>(false);
  const [openDialog, setopenDialog] = useState(false);

  const handleChange = (panel: number) => (_: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) getRooms(panel)
  };
  /*CONTROLADOR DEL DIALOG PARA CREAR */

  const handleDialog = useCallback((value: any) => {
    setopenDialog(value);
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h6">Arriendos</Typography>
        <ComponentButton
          text="Nuevo Registro"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
      </Stack>

      <Grid container>
        <Grid item xs={12} sm={5}>
          {
            properties.map((propertie: any) => (
              <Accordion key={propertie.id} expanded={expanded === propertie.id} onChange={handleChange(propertie.id)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  {/* <img src={propertie.photo} alt="Descripción de la imagen" style={{ height: '180px', width: '170px', objectFit: 'cover', }} /> */}
                  <Typography sx={{ width: '33%', flexShrink: 0, padding: '5px' }}>
                    {propertie.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Stack spacing={1}>
                      <Typography variant="h6">Ambientes</Typography>
                    </Stack>
                  </Stack>
                  <RoomsView />
                </AccordionDetails>
              </Accordion>
            ))
          }
        </Grid>
        <Grid item xs={12} sm={7} >
          <div style={{ display: 'flex', flexDirection: 'column', height: `80vh` }}>
            <CalendarComponent />
          </div>
        </Grid>
      </Grid>
      {
        openDialog &&
        <CreateLease
          open={openDialog}
          handleClose={() => handleDialog(false)}
        />
      }
    </>
  )
}
