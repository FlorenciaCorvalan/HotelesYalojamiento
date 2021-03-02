import React, { useContext } from "react";
import { HotelContext } from "../Context";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 100%;
  background-color: rgb(94, 16, 167);
  display: flex;
`;

const Tittle = styled.h2`
  margin-left: 28px;
  margin-top: 0;
  padding-top: 13px;
  color: #ffff;
  font-size: 45px;
  text-align: left;
  text-shadow: 2px 2px 0px black;
`;

const HeaderBody = styled.h2`
  margin-bottom: 0;
  margin-left: 28px;
  margin-bottom: 16px;
  color: #ffff;
  font-weight: 350;
  text-align: left;
`;

export default function Header() {
  const { filters } = useContext(HotelContext);

  let startDate = new Date(`${filters.startDate}T12:00:00Z`);
  let exitDate = new Date(`${filters.exitDate}T12:00:00Z`);
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  return (
    <HeaderContainer>
      <img src="./images/hotel.png" alt="Logo Hoteles Latam" id="logo" />
      <div>
        <Tittle>Hoteles LATAM</Tittle>
        <HeaderBody>
          Búsqueda de hoteles{" "}
          {filters.size !== "0"
            ? filters.size === "1"
              ? "pequeños"
              : filters.size === "2"
              ? "medianos"
              : filters.size === "3"
              ? "grandes"
              : String.empty
            : String.empty}
          {filters.price !== "0"
            ? ` con precio desde 
          ${Array.from({ length: filters.price })
            .map(() => "$")
            .join("")}`
            : String.empty}
          {filters.startDate !== ""
            ? ` desde el  ${startDate.toLocaleDateString("es-ES", options)}`
            : String.empty}
          {filters.exitDate !== ""
            ? ` hasta el ${exitDate.toLocaleDateString("es-ES", options)}`
            : String.empty}
          {filters.country !== "todos"
            ? ` en ${filters.country}`
            : String.empty}
        </HeaderBody>
      </div>
    </HeaderContainer>
  );
}
