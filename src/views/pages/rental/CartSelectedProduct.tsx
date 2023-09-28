import { ComponentButton, ComponentInput, ComponentSelect } from "@/components";
import { useForm, useSelectedProductStore } from "@/hooks";
import { Add } from "@mui/icons-material";
import { Chip, Divider, Grid, Icon, List, ListItem, ListItemText, Paper, Typography, styled } from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  margin: '10px',
  padding: '7px'
}));

const formFields = {
  typeCustomer: '',
  typeCustomerId: '',
}

const formValidations = {
  typeCustomer: [(value: any) => value.length >= 1, 'Debe seleccionar un tipo de cliente'],
}

const dividerStyle = {
  height: '1px',
  width: '90%',
  marginTop: '5px',
  marginBottom: '5px',
  backgroundColor: '#085139',
  marginLeft: '15px'
}
const container = {
  borderRadius: '20px',
  padding: '10px',
  backgroundColor: '#F7F4F4'
}

export const CartSelectedProduct = () => {
  const { selectedProducts } = useSelectedProductStore();
  const [ form ] = useState(formFields);
  const [ formSubmitted ] = useState(false);
  const { typeCustomer, typeCustomerValid } = useForm(form, formValidations);
  const [ screenHeight, setScreenHeight ] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  return (
    <div style={container}>
      {selectedProducts.length > 0 && <>
        <Typography variant="h6" style={{ textAlign: 'center' }}>Arriendos creados</Typography>
        <Paper sx={{ padding: '6px 0px', borderRadius: '10px'}}>
          <Typography style={{ textAlign: 'center' }}>
            <Chip
              label="20 Septiembre 2023"
              variant="outlined"
              icon={<CalendarIcon />}
              sx={{ marginBottom: '0px', backgroundColor: '#DEA427' }}
            />
          </Typography>
          <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', margin: '5px auto', padding: '0px 5px', borderRadius: '10px'}}>
            <ListItem sx={{ padding: '0px 10px' }}>
              <ListItemText primary="Cumpleaños" secondary="09:00 - 17:00"></ListItemText>
            </ListItem>
            <Divider style={dividerStyle} />
            <ListItem sx={{ padding: '0px 10px'}}>
              <ListItemText primary="Boda coronel" secondary="08:00 - 16:00"></ListItemText>
            </ListItem>
            <Divider style={dividerStyle} />
            <ListItem sx={{ padding: '0px 10px'}}>
              <ListItemText primary="Reunión" secondary="08:00 - 12:00"></ListItemText>
            </ListItem>
          </List>
        </Paper>
        <Paper sx={{margin: '15px 0px', padding: '7px 7px 2px 7px', borderRadius: '10px'}}>
          <Typography style={{ textAlign: 'center' }}>Creación de Arriendo</Typography>
          <form>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{padding: '4px 5px'}}>
                <ComponentSelect
                  label={null}
                  labelChip={'algo'}
                  title='Horas'
                  value={''}
                  onPressed={() => {}}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding: '4px 5px'}}>
                <ComponentSelect
                  label={null}
                  labelChip={'algo'}
                  title='Tarifa'
                  value={''}
                  onPressed={() => {}}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{padding: '4px 5px'}}>
                <ComponentInput
                  type={null}
                  label="Detalle"
                  name="Detail"
                  value={''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding: '4px 5px'}}>
                <ComponentSelect
                  label={null}
                  labelChip={['name']}
                  title='Cliente'
                  name="typeCustomer"
                  value={typeCustomer}
                  onPressed={() => { }}
                  error={!!typeCustomerValid && formSubmitted}
                  helperText={formSubmitted ? typeCustomerValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{padding: '5px 5px'}}>
                <ComponentButton
                  text="completar"
                  width="100%"
                  height="80%"
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Grid container sx={{height: 50}}>
          <Grid item xs={12} sm={12} sx={{padding: '0px 2px'}}>
            <ComponentButton
              text="Crear arriendo"
              width="100%"
              height="90%"
            />
          </Grid>
        </Grid>
      </>
      }
    </div>
  )
}
