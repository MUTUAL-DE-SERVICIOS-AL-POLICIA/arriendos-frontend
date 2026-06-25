import { DocumentScanner, Home, HourglassBottom, Person, Security } from "@mui/icons-material"

export const menuSettings = () => {
    return [
        {
            title: "Ajustes de productos",
            permission: "products.view",
            group: [
                {
                    path: "/hourRangesView",
                    title: "Rangos de horas",
                    icon: <HourglassBottom />,
                    permission: "products.view"
                },
                {
                    path: "/ratesView",
                    title: "Tarifas",
                    icon: <HourglassBottom />,
                    permission: "products.view"
                },
                {
                    path: "/requirementsView",
                    title: "Requisitos",
                    icon: <DocumentScanner />,
                    permission: "requirements.view"
                },
            ]
        },
        {
            title: "Ajustes de Clientes",
            permission: "customers.view",
            group: [
                {
                    title: "Tipos de Clientes",
                    permission: "customers.view",
                    path: "/typeCustomersView",
                    icon: <DocumentScanner />
                },
            ]
        },
        {
            title: "Gestion de Usuarios",
            permission: "users.view",
            group: [
                {
                    path: "/usersView",
                    title: "Usuarios",
                    icon: <Person />,
                    permission: "users.view"
                },
                {
                    path: "/rolesView",
                    title: "Roles",
                    icon: <Security />,
                    permission: "users.view"
                },
            ]
        },
        {
            title: "Gestion de Inmuebles",
            permission: "rooms.view",
            group: [
                {
                    path: "/propertiesView",
                    title: "Inmuebles",
                    icon: <Home />,
                    permission: "rooms.view"
                },
            ]
        }
    ]
}
