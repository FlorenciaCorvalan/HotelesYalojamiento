import React, { useContext } from "react";
import { HotelContext } from "../Context";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBed, faMapMarker } from "@fortawesome/free-solid-svg-icons";
library.add(faBed);
library.add(faMapMarker);

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin-top: 50px;
  width: 90%;
  margin-left: 5%;

  @media screen and (max-width: 750px) {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5%;
  }
`;

const CardBoddy = styled.div`
  border: 0.5pt solid #bfc9ca;
  border-radius: 5px;
`;

const CardTittle = styled.h1`
  margin-left: 20px;
  text-align: left;
`;

const CardImage = styled.img`
  width: 100%;
  display: block;
`;

const CardText = styled.div`
  width: 80%;
  margin-left: 20px;
  text-align: left;
  display: flex;
  align-items: center;
`;

const ReserveButton = styled.button`
  display: block;
  width: 90%;
  border: 0;
  color: #fff;
  background-color: #00c3af;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  outline: none !important;
  &:hover {
    background: rgb(94, 16, 167);
  }
`;

const SinResult = styled.p`
  margin-bottom: 0;
  margin-left: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

export default function Cards() {
  const { hotelFilters } = useContext(HotelContext);
  return (
    <>
      {hotelFilters.length !== 0 ? (
        <CardContainer>
          {hotelFilters.map((item, index) => {
            return (
              <CardBoddy key={index}>
                <CardImage src={item.photo} alt="imagen" />
                <CardTittle>{item.name}</CardTittle>
                <CardText>{item.description} </CardText>

                <CardText>
                  <Icon icon="map-marker" className="blueone" />
                  <p className="back">{`${item.city}, ${item.country}`}</p>
                </CardText>

                <CardText>
                  <Icon icon="bed" className="blueone" />
                  <p className="back">{item.rooms} Habitaciones</p>
                </CardText>

                <CardText className="price">
                  precio:{" "}
                  {Array.from({ length: item.price })
                    .map(() => "$")
                    .join("")}
                </CardText>

                <ReserveButton>Reservar </ReserveButton>
              </CardBoddy>
            );
          })}
        </CardContainer>
      ) : (
        <div>
          <SinResult>No hay resultados para tu busqueda</SinResult>
        </div>
      )}
    </>
  );
}
