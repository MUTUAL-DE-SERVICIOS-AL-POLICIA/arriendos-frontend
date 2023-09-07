import { Person, Wifi } from "@mui/icons-material"

export const menuSettings = () => {
    return [
        {
            path: "/typeCustomersView",
            title: "Tipos de Clientes",
            icon: <Wifi />
        },
        {
            title: "Ajustes de productos",
            permission: "show-rent",
            group: [
                {
                    path: "/propertiesView",
                    title: "Rangos de horas",
                    icon: <Wifi />,
                    permission: "show-halls"
                },
                {
                    path: "/propertiesView",
                    title: "Tarifas",
                    icon: <Wifi />,
                    permission: "show-halls"
                },{
                    path: "/propertiesView",
                    title: "Requisitos",
                    icon: <Wifi />,
                    permission: "show-halls"
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
                {
                    path: "/users/rolesView",
                    title: "Roles",
                    icon: <Wifi />,
                    permission: "show-roles"
                }
            ]
        },
    ]
}