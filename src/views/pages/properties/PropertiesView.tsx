import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Stack, SvgIcon } from '@mui/material';
import { ComponentButton } from '@/components';
import { Add } from '@mui/icons-material';
import { usePropertieStore, useRoomStore } from '@/hooks';
import { RoomsView } from '.';

export const PropertiesView = () => {

    const { properties, getProperties } = usePropertieStore();
    const { getRooms } = useRoomStore();
    React.useEffect(() => {
        getProperties();
    }, []);

    const [expanded, setExpanded] = React.useState<number | false>(false);

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
                    <Typography variant="h6">Inmuebles</Typography>
                </Stack>
                <ComponentButton
                    text="Nuevo Inmueble"
                    onClick={() => { }}
                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
            </Stack>
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
                                <ComponentButton
                                    text="Nuevo Ambiente"
                                    onClick={() => { }}
                                    startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
                            </Stack>
                            <RoomsView />
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </>
    );
}