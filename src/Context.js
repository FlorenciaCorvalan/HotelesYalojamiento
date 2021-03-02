import React, { useState } from "react";
import items from "./data";

export const HotelContext = React.createContext(items);

export default function HotelProvider({ children }) {
  const [hotels] = useState(items);
  const [hotelFilters, setHotelFilters] = useState(items);

  const [filters, setFilters] = useState({
    price: "0",
    country: "todos",
    size: "0",
    startDate: "",
    exitDate: ""
  });

  return (
    <HotelContext.Provider
      value={{
        hotels,
        hotelFilters,
        setHotelFilters,
        filters,
        setFilters
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}
