import { ComponentButton } from "@/components";
import { Add } from "@mui/icons-material";
import { Stack, SvgIcon } from "@mui/material";
import { useCallback, useState } from "react";
import { RoleTable, CreateRole } from ".";

export const RolesView = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<any>(null);

  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null);
    setOpenDialog(value);
  }, []);

  return (
    <>
      <Stack direction="row" justifyContent="end">
        <ComponentButton
          text="Nuevo Rol"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
        />
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
