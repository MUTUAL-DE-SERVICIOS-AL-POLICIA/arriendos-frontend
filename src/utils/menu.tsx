import { Assessment, Bento, CalendarMonth, Group, Receipt } from "@mui/icons-material"

export const menu = () => {
    return [
        {
            path: "/rentalCalendarView",
            title: "Calendario",
            icon: <CalendarMonth />,
            permission: "leases.view"
        },
        {
            path: "/customersView",
            title: "Clientes",
            icon: <Group />,
            permission: "customers.view"
        },
        {
            path: "/rentalView",
            title: "Alquileres",
            icon: <Receipt />,
            permission: "leases.view"
        },
        {
            path: "/productsView",
            title: "Productos",
            icon: <Bento />,
            permission: "products.view"
        },
        {
            path: "/reports",
            title: "Reportes",
            icon: <Assessment />
        }
    ]
}
