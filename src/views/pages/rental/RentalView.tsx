import { useCallback, useState } from "react";
import { CreateDamage, RentalTable } from "."

export const RentalView = () => {
  const [onDamage, setOnDamage] = useState(false);

  const handleDialog = useCallback((value: boolean) => {
    setOnDamage(value);
  }, []);

  return (
    <>
      <RentalTable />
      {
        onDamage &&
        <CreateDamage
          open={onDamage}
          handleClose={() => handleDialog(false)}
        />
      }
    </>
  )
}