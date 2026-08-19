/**
 * Configuración del menú de ajustes/configuración.
 *
 * Define los elementos del menú de ajustes agrupados por categorías.
 * Cada categoría y elemento tiene un permiso RBAC requerido.
 *
 * Grupos y permisos:
 * - Ajustes de productos:
 *   - Rangos de horas: products.view
 *   - Tarifas: products.view
 *   - Requisitos: requirements.view
 * - Ajustes de Clientes:
 *   - Tipos de Clientes: customers.view
 * - Gestión de Usuarios:
 *   - Usuarios: users.view
 *   - Roles: users.view
 * - Gestión de Inmuebles:
 *   - Inmuebles: rooms.view
 *
 * Autor: Dilan Torrez
 * Fecha: 2026
 */

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
