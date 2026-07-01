/**
 * Vista principal de gestión de roles.
 *
 * Muestra la lista de roles del sistema y permite:
 * - Crear nuevos roles (requiere permiso users.add)
 * - Editar roles existentes (requiere permiso users.change)
 * - Eliminar roles (requiere permiso users.delete)
 *
 * Permisos requeridos:
 * - users.add: Para ver el botón "Nuevo Rol"
 * - users.change: Para ver botones de edición en RoleTable
 * - users.delete: Para ver botones de eliminación en RoleTable
 *
 * Autor: Dilan Torrez
 * Fecha: 2026
 */

import { ComponentButton } from "@/components";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon } from "@mui/material";
import { useCallback, useState } from "react";
import { RoleTable, CreateRole } from ".";
import { useAuthStore } from "@/hooks";

export const RolesView = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<any>(null);
  const { hasPermission } = useAuthStore();

  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setOpenDialog(value);
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="end">
        {hasPermission('users.add') && (
          <ComponentButton
            text="Nuevo Rol"
            onClick={() => handleDialog(true)}
            startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
          />
        )}
      </Stack>

      <RoleTable
        handleEdit={(v) => {
          setItemEdit(v);
          handleDialog(true);
        }}
      />

      {openDialog && (
        <CreateRole
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit}
        />
      )}
    </>
  );
};
