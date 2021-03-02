import React from "react";
import "./styles.css";
import Cards from "./components/Cards";
import Header from "./components/Header";
import Filter from "./components/Filtros";
import HotelProvider from "./Context";

export default function App() {
  return (
    <div className="App">
      <HotelProvider>
        <Header />
        <Filter />
        <Cards />
      </HotelProvider>
    </div>
  );
}
