/**
 * Configuración del menú principal de navegación.
 *
 * Define los elementos del menú lateral con sus rutas,
 * iconos y permisos requeridos.
 *
 * Cada elemento tiene:
 * - path: Ruta de la vista
 * - title: Título a mostrar en el menú
 * - icon: Icono de Material UI
 * - permission: Permiso RBAC requerido para ver el elemento
 *
 * Si el usuario no tiene el permiso, el elemento no se muestra.
 *
 * Autor: Dilan Torrez
 * Fecha: 2026
 */

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
            icon: <Assessment />,
            permission: "leases.view"
        }
    ]
}
