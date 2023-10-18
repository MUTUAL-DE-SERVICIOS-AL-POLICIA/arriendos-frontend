import { useEffect, useState } from "react";
import { RentalCard } from ".";
import { CartView } from "./cart";
import { CustomerModel } from "@/models";

interface rentalProps {
  showCart: boolean;
  date: Date | null;
  customer: CustomerModel;
  events: any[];
  onClose: () => void;
  screenHeight: number;
}
export const RentalSection = (props: rentalProps) => {

  const {
    showCart,
    date,
    customer,
    events,
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
          showGrow={showGrow}
          date={date}
          events={events}
        />
        {showCart && <CartView
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