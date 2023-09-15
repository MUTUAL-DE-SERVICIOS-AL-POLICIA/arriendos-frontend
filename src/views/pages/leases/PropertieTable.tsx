import { usePropertieStore, useRoomStore } from "@/hooks";
import { Accordion, AccordionDetails, AccordionSummary, Stack, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ComponentButton } from "@/components";
import { RoomsView } from ".";
import { Add } from "@mui/icons-material";

export const PropertieTable = () => {
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
                            <RoomsView stateSelect />
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </>
    )
}
