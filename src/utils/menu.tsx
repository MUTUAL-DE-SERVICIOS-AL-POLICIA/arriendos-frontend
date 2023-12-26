import { Assessment, Bento, CalendarMonth, Group, Home, Receipt } from "@mui/icons-material"

export const menu = () => {
    return [
        // {
        //     path: "/dashboardView",
        //     title: "Inicio",
        //     icon: <Home />
        // },
        {
            path: "/rentalCalendarView",
            title: "Calendario",
            icon: <CalendarMonth />,
            permission: "show-rates"
        },
        {
            path: "/productsView",
            title: "Productos",
            icon: <Bento />,
            permission: "show-rates"
        },
        {
            path: "/propertiesView",
            title: "Inmuebles",
            icon: <Home />,
            permission: "show-halls"
        },
        {
            path: "/rentalView",
            title: "Alquileres",
            icon: <Receipt />,
            permission: "show-rates"
        },
        {
            path: "/customersView",
            title: "Clientes",
            icon: <Group />,
            permission: "show-halls"
        },
        {
            path: "/reports",
            title: "Reportes",
            icon:<Assessment/>
        }
    ]
}