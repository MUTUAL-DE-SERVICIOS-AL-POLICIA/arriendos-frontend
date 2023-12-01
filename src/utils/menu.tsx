import { Bento, CalendarMonth, Group, Home, Receipt } from "@mui/icons-material"

export const menu = () => {
    return [
        // {
        //     path: "/dashboardView",
        //     title: "Inicio",
        //     icon: <Home />
        // },
        {
            title: "Gestión de Alquileres",
            permission: "show-rent",
            group: [
                {
                    path: "/propertiesView",
                    title: "Inmuebles",
                    icon: <Home />,
                    permission: "show-halls"
                },
                {
                    path: "/productsView",
                    title: "Productos",
                    icon: <Bento />,
                    permission: "show-rates"
                },
            ]
        },
        {
            title: "Gestión de Alquileres",
            permission: "show-rent",
            group: [
                {
                    path: "/rentalCalendarView",
                    title: "Calendario",
                    icon: <CalendarMonth />,
                    permission: "show-rates"
                },
                {
                    path: "/rentalView",
                    title: "Alquileres",
                    icon: <Receipt />,
                    permission: "show-rates"
                }
            ]
        },
        {
            title: "Gestión de Clientes",
            permission: "show-rent",
            group: [
                {
                    path: "/customersView",
                    title: "Clientes",
                    icon: <Group />,
                    permission: "show-halls"
                },
            ]
        },
        // {
        //     title: "Reportes",
        //     permission: "show-rent",
        //     group: [
        //         {
        //             path: "/rent/hallsView",
        //             title: "Reportes",
        //             icon: <Assessment />,
        //             permission: "show-halls"
        //         }
        //     ]
        // },
    ]
}