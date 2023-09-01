import { usePropertieStore, useRoomStore } from "@/hooks";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RoomsView } from "../properties";

export const LeasesView = () => {

  const { properties, getProperties } = usePropertieStore();
  const { getRooms } = useRoomStore();
  useEffect(() => {
    getProperties();
  }, []);

  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange = (panel: number) => (_: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) getRooms(panel)
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Stack spacing={1}>
          <Typography variant="h6">Arriendos</Typography>
        </Stack>
      </Stack>
      <Grid style={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item xs={12} sm={6}>
          {
            properties.map((propertie: any) => (
              <Accordion key={propertie.id} expanded={expanded === propertie.id} onChange={handleChange(propertie.id)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <img src={propertie.photo} alt="Descripción de la imagen" style={{ height: '180px', width: '170px', objectFit: 'cover', }} />
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
        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>

        </Grid>
      </Grid>

    </>
  )
}
