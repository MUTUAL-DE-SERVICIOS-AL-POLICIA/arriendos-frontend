import { Group, Person, Wifi } from "@mui/icons-material"

export const menu = () => {
    return [
        {
            path: "/dashboardView",
            title: "Inicio",
            icon: <Wifi />
        },
        {
            title: "Gestión de Arriendos",
            permission: "show-rent",
            group: [
                {
                    path: "/propertiesView",
                    title: "Inmuebles",
                    icon: <Wifi />,
                    permission: "show-halls"
                },
                {
                    path: "/rent/ratesView",
                    title: "Tarifas",
                    icon: <Wifi />,
                    permission: "show-rates"
                },
                {
                    path: "/rent/ratesView",
                    title: "Productos",
                    icon: <Wifi />,
                    permission: "show-rates"
                }
            ]
        },
        {
            title: "Gestión de Planes",
            permission: "show-rent",
            group: [
                {
                    path: "/rent/hallsView",
                    title: "Planes",
                    icon: <Wifi />,
                    permission: "show-halls"
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
                {
                    path: "/typeCustomersView",
                    title: "Tipos de Clientes",
                    icon: <Wifi />,
                    permission: "show-halls"
                }
            ]
        },
        {
            title: "Gestión de Uuarios",
            permission: "show-rent",
            group: [
                {
                    path: "/usersView",
                    title: "Usuarios",
                    icon: <Person />,
                    permission: "show-users"
                },
                {
                    path: "/users/rolesView",
                    title: "Roles",
                    icon: <Wifi />,
                    permission: "show-roles"
                }
            ]
        },
        {
            title: "Reportes",
            permission: "show-rent",
            group: [
                {
                    path: "/rent/hallsView",
                    title: "Reportes",
                    icon: <Wifi />,
                    permission: "show-halls"
                }
            ]
        },
    ]
}