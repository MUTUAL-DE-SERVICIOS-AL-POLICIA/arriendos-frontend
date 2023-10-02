import { ComponentButton } from '@/components';
import { Add } from '@mui/icons-material';
import { Stack, SvgIcon, Typography, Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { CreatePropertie, PropertieTable } from '.';
import { PropertieModel } from '@/models';


const SIDE_NAV_WIDTH = 100;


export const PropertiesView = () => {

  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<PropertieModel | null>(null);



  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setopenDialog(value);
  }, []);



  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: {
            lg: `calc((100%/4 / 25) * 2)`
          },
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ paddingLeft: 2 }}>Inmuebles</Typography>
          <ComponentButton
            text="Nuevo Inmueble"
            onClick={() => handleDialog(true)}
            startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>} />
        </Stack>
      </Box>
      <PropertieTable
        onEdit={(propertie) => {
          setItemEdit(propertie);
          handleDialog(true);
        }}
      />
      {openDialog &&
        <CreatePropertie
          open={openDialog}
          handleClose={() => handleDialog(false)}
          propertie={itemEdit}
        />
      }
    </>
  );
}