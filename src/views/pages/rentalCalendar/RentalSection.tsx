import { useEffect, useState } from "react";
import { CartView } from "./cart";
import { CustomerModel } from "@/models";
import { virifyDate } from "@/helpers";
import { RentalCard } from "./stateRental/RentalCard";

interface rentalProps {
  date: Date | null;
  customer: CustomerModel;
  onClose: () => void;
  screenHeight: number;
}
export const RentalSection = (props: rentalProps) => {

  const {
    date,
    customer,
    onClose,
    screenHeight,
  } = props;

  const [showGrow, setShowGrow] = useState(false);
  useEffect(() => {
    if (date) {
      setShowGrow(false);
      const timeoutId = setTimeout(() => {
        setShowGrow(true);
      }, 300);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [date]);


  return (
    <>
      {date && <>
        <RentalCard
          screenHeight={screenHeight}
          showGrow={showGrow}
          date={date}
        />
        {virifyDate(date) && <CartView
          date={date}
          customer={customer}
          onClose={onClose}
          screenHeight={screenHeight}
        />}
      </>
      }
    </>
  )
}