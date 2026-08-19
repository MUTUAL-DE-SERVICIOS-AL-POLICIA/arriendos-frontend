/**
 * Componente para crear o editar roles.
 *
 * Formulario modal que permite:
 * - Crear un nuevo rol con permisos
 * - Editar un rol existente
 *
 * Características:
 * - Muestra todos los módulos disponibles
 * - Permite seleccionar permisos por módulo (Ver, Crear, Editar, Eliminar)
 * - Valida que el nombre sea obligatorio
 * - Muestra estado activo/inactivo
 *
 * Props:
 * - open: Controla si el diálogo está abierto
 * - handleClose: Función para cerrar el diálogo
 * - item: Rol a editar (null para crear nuevo)
 *
 * Estructura de permisos:
 * {
 *   moduleId: ["view", "add", "change", "delete"]
 * }
 *
 * Autor: Dilan Torrez
 * Fecha: 2026
 */

import { useRoleStore } from "@/hooks";
import {
  Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, FormGroup, Grid, Typography
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any | null;
}

export const CreateRole = (props: createProps) => {
  const { open, handleClose, item } = props;
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [selectedPermissions, setSelectedPermissions] = useState<Record<number, string[]>>({});
  const { getModules, getPermissions, postCreateRole, patchUpdateRole } = useRoleStore();

  useEffect(() => {
    loadData();
    if (item) {
      setName(item.name);
      setDescription(item.description || '');
      setIsActive(item.is_active);
      const perms: Record<number, string[]> = {};
      item.role_permissions?.forEach((rp: any) => {
        perms[rp.module] = rp.permission_names || [];
      });
      setSelectedPermissions(perms);
    }
  }, [item]);

  const loadData = async () => {
    const [mods, perms] = await Promise.all([getModules(), getPermissions()]);
    setModules(mods);
    setPermissions(perms);
  };

  const handlePermissionToggle = (moduleId: number, permCodename: string) => {
    setSelectedPermissions((prev) => {
      const current = prev[moduleId] || [];
      const newPerms = current.includes(permCodename)
        ? current.filter((p) => p !== permCodename)
        : [...current, permCodename];
      return { ...prev, [moduleId]: newPerms };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const permissions_data = modules
      .filter((m) => selectedPermissions[m.id]?.length > 0)
      .map((m) => ({
        module: m.id,
        permissions: permissions
          .filter((p) => selectedPermissions[m.id]?.includes(p.codename))
          .map((p) => p.id),
      }));

    const body = { name, description, is_active: isActive, permissions_data };

    let success;
    if (item) {
      success = await patchUpdateRole(item.id, body);
    } else {
      success = await postCreateRole(body);
    }

    setLoading(false);
    if (success) handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{item ? 'Editar Rol' : 'Crear Rol'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <label style={{ fontWeight: 'bold' }}>Nombre del Rol *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%', padding: '8px', border: '1px solid #ccc',
                  borderRadius: '4px', fontSize: '14px', marginTop: '4px'
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <label style={{ fontWeight: 'bold' }}>Descripcion</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%', padding: '8px', border: '1px solid #ccc',
                  borderRadius: '4px', fontSize: '14px', marginTop: '4px'
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                }
                label="Activo"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>Permisos por Modulo</Typography>
              {modules.map((module) => (
                <div key={module.id} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {module.name}
                  </Typography>
                  <FormGroup row>
                    {permissions.map((perm) => (
                      <FormControlLabel
                        key={perm.id}
                        control={
                          <Checkbox
                            checked={selectedPermissions[module.id]?.includes(perm.codename) || false}
                            onChange={() => handlePermissionToggle(module.id, perm.codename)}
                            size="small"
                          />
                        }
                        label={perm.name}
                      />
                    ))}
                  </FormGroup>
                </div>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress color="success" size={30} />
          ) : (
            <>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit">{item ? 'GUARDAR' : 'CREAR'}</Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
