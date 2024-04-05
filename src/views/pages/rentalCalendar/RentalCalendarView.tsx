import { useForm, useProductStore, useRentalStore } from "@/hooks";
import { useEffect, useState } from "react";
import { ComponentInputSelect, ModalSelectComponent } from "@/components";
import { FormRentalModel } from "@/models";
import { PropertieTable } from "../properties";
import { CalendarComponent } from "./calendar";
import { Box, styled } from '@mui/system';
import { Drawer, Grid, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { CustomerTable } from "../customers";
import { RentalSection } from ".";
import { virifyDate } from "@/helpers";
import { InfoOutlined } from '@mui/icons-material';

const formFields: FormRentalModel = {
  room: null,
  customer: null,
}

// Estilos ==============================>

const SliderCalendar = styled('div')`
  transition: width 0.5s ease-in;
  padding: 5px;
`;

const SliderContent = styled('div')`
  transition: width 0.5s ease-in;
  padding: 5px;
`;

export const RentalCalendarView = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [openNav, setOpenNav] = useState(false);
  const { room, customer, onValueChange } = useForm(formFields);
  const { postLeakedProduct, clearLakedProduct } = useProductStore();
  const { getRentals } = useRentalStore();
  const [daySelect, setDaySelect] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getRentals(room == null ? null : room.id);
  }, [room])

  useEffect(() => {
    if (daySelect != null && room != null && customer != null && virifyDate(daySelect)) {
      postLeakedProduct(daySelect, {
        customer_type: customer.customer_type.id,
        room_id: room.id
      })
    } else {
      clearLakedProduct()
    }
  }, [daySelect, room, customer])

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);
  // Modal =================================================
  const [modalRoom, setModalRoom] = useState(false);
  const handleModalRoom = (value: boolean) => {
    setModalRoom(value);
  };

  const [modalClient, setModalClient] = useState(false);
  const handleModalClient = (value: boolean) => {
    setModalClient(value);
  };

  const handleInfoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseInfo = () => {
    setAnchorEl(null)
  }

  const contentCalendar = (
    <>
      {modalRoom && <ModalSelectComponent
        stateSelect={true}
        stateMultiple={false}
        title='Ambientes'
        opendrawer={modalRoom}
        handleDrawer={() => handleModalRoom(false)}
      >
        <PropertieTable
          stateSelect={true}
          itemSelect={(v) => {
            if (room == null || room.id != v.id) {
              onValueChange('room', v);
            } else {
              onValueChange('room', null);
            }
            handleModalRoom(false)
          }}
          items={room == null ? [] : [room.id]}
        />
      </ModalSelectComponent>
      }
      {
        modalClient && <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Clientes'
          opendrawer={modalClient}
          handleDrawer={() => handleModalClient(false)}
        >
          <CustomerTable
            limitInit={5}
            stateSelect={true}
            itemSelect={(v) => {
              if (customer == null || customer.id != v.id) {
                onValueChange('customer', v);
              } else {
                onValueChange('customer', null);
              }
              handleModalClient(false)
            }}
            items={customer == null ? [] : [customer.id]}
          />
        </ModalSelectComponent>
      }
      <Grid container>
        <Grid item xs={12} sm={5} sx={{ px: .5 }}>
          <ComponentInputSelect
            title={customer != null ? (customer.institution_name ?? customer.contacts[0].name) : 'Cliente'}
            label={customer == null ? '' : 'Cliente'}
            onPressed={() => handleModalClient(true)}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ px: .5 }}>
          <ComponentInputSelect
            title={room != null ? room.name : 'Ambiente'}
            label={room == null ? '' : 'Ambiente'}
            onPressed={() => handleModalRoom(true)}
          />
        </Grid>
        <Grid item xs={12} sm={1}>
          <Box display="flex" alignItems="center" height="100%">
            <IconButton
              id="basic-button"
              aria-controls={ open ? 'basic-menu': undefined }
              aria-haspopup="true"
              aria-expanded={ open ? 'true' : undefined }
              onClick={handleInfoClick}
            >
              <InfoOutlined color="primary" fontSize="large" sx={{ml: 3}} />
            </IconButton>
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseInfo}
            MenuListProps={{
              sx: {
                '& .MuiMenuItem-root:': {
                  '&:hover': {
                    backgroundColor: 'inherit',
                    color: 'inherit',
                    cursor: 'default'
                  }
                },
              },
              'aria-labelledby': 'basic-button',
            }}
          >
            <div style={{marginLeft: '6px', marginRight: '6px'}}>
              <MenuItem onClick={handleCloseInfo} sx={{backgroundColor: '#FFDD33', fontWeight: 700}}>Pre reserva</MenuItem>
              <MenuItem onClick={handleCloseInfo} sx={{backgroundColor: '#1E9E85', fontWeight: 700}}>Reserva</MenuItem>
              <MenuItem onClick={handleCloseInfo} sx={{backgroundColor: '#F79009', fontWeight: 700}}>Concluido</MenuItem>
            </div>
          </Menu>
        </Grid>
      </Grid>
      <CalendarComponent
        daySelect={daySelect}
        onSelectDay={(day) => {
          setDaySelect(day);
          setOpenNav(true);
        }}
        screenHeight={screenHeight}
      />
    </>
  )
  const contentRental = (
    <RentalSection
      date={daySelect}
      customer={customer}
      onClose={() => {
        setDaySelect(null);
        getRentals(room.id);
      }}
      screenHeight={screenHeight}
    />
  )

  if (!lgUp) {
    return (
      <>
        {contentCalendar}
        <Drawer
          anchor="right"
          onClose={() => { setOpenNav(false) }}
          open={openNav && daySelect ? true : false}
          PaperProps={{
            sx: {
              width: 250
            }
          }}
          sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
          variant="temporary"
        >
          {contentRental}
        </Drawer>
      </>
    );
  }

  return (
    <>

      <div style={{ display: 'flex' }}>
        <SliderCalendar style={{ width: daySelect ? '60%' : '100%' }}>
          {contentCalendar}
        </SliderCalendar>

        <SliderContent style={{ width: daySelect ? '40%' : '0%' }}>
          {contentRental}
        </SliderContent>
      </div>
    </>
  )
}