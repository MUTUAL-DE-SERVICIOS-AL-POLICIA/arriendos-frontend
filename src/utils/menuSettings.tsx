import { DocumentScanner, Home, HourglassBottom, Person, Wifi } from "@mui/icons-material"

export const menuSettings = () => {
    return [
        {
            title: "Ajustes de productos",
            permission: "show-rent",
            group: [
                {
                    path: "/hourRangesView",
                    title: "Rangos de horas",
                    icon: <HourglassBottom />,
                    permission: "show-halls"
                },
                {
                    path: "/ratesView",
                    title: "Tarifas",
                    icon: <Wifi />,
                    permission: "show-halls"
                }, {
                    path: "/requirementsView",
                    title: "Requisitos",
                    icon: <DocumentScanner />,
                    permission: "show-halls"
                },
            ]
        },
        {
            title: "Ajustes de Clienes",
            permission: "show-rent",
            group: [
                {
                    title: "Tipos de Clientes",
                    permission: "show-rent",
                    path: "/typeCustomersView",
                    icon: <Wifi />
                },
            ]
        },
        {
            title: "Gestión de Usuarios",
            permission: "show-rent",
            group: [
                {
                    path: "/usersView",
                    title: "Usuarios",
                    icon: <Person />,
                    permission: "show-users"
                },
                // {
                //     path: "/users/rolesView",
                //     title: "Roles",
                //     icon: <Wifi />,
                //     permission: "show-roles"
                // }
            ]
        },
        {
            title: "Gestion de Inmuebles",
            permission: "show-rent",
            group: [
                {
                    path: "/propertiesView",
                    title: "Inmuebles",
                    icon: <Home />,
                    permission: "show-halls"
                },
            ]
        }
    ]
}