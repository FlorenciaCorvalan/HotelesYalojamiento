import React, { useContext, useState } from "react";
import { HotelContext } from "../Context";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faGlobe,
  faDollarSign,
  faBed
} from "@fortawesome/free-solid-svg-icons";

const FilterContainer = styled.div`
  width: 100%;
  background-color: #00c3af;
  margin-top: 0px;
`;

const FilterBody = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-grow: 10px;
  width: 100%;
  background-color: rgb(10, 196, 221);
  padding-top: 30px;
  padding-bottom: 30px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FilterTheme = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  height: 1.8rem;
  padding: 0.25rem;
  border-radius: 2.5px;
  margin-left: 10px;
  input,
  select {
    width: 150px;
    border: none;
    margin-left: 0.5rem;
    color: gray;
    background-color: white;

    ::-webkit-calendar-picker-indicator {
      opacity: 25%;
    }

    &:focus {
      outline: none;
    }
  }
  option {
    font-size: 1.025rem;
  }

  @media screen and (max-width: 700px) {
    margin: 0.25rem;
    width: 90%;
    input,
    select {
      width: 100%;
    }
  }
`;

const FilterDate = styled.input`
  padding: 7px 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid #eee;
  border-left: 0;
  transition: all 0.2s ease;
  border-radius: 2.5px;
  background-color: transparent;
  outline: none;
  margin-left: 10px;
  background: white;
  color: gray;
  padding-left: 5px;

  &:focus {
    border-bottom-color: #eee;
    outline: 0;
  }
`;

const FilterSelect = styled.select`
  border-radius: 10px;
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const ResetButton = styled.button`
  display: block;
  width: 70%;
  height: 35px;
  border: 0;
  color: #fff;
  background-color: brown;
  border-radius: 10px;
  cursor: pointer;
  padding: 5px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  padding-left: 5px;
  margin: 8px 10px;

  &:hover {
    background: #273746;
  }
`;

const ErrorMensaje = styled.p`
  padding-bottom: 15px;
  margin-top: 0;
  font-weight: 100;
  font-size: 20px;
  text-align: center;
  color: white;
  background: orange;
`;

export default function Filter() {
  const { hotels, setHotelFilters, filters, setFilters } = useContext(
    HotelContext
  );
  const [initialState] = useState(filters);
  const [message, setMessage] = useState("");

  const handleChange = (filter, e) => {
    const value = e.target.value;
    setFilters((filters) => {
      return {
        ...filters,
        [filter]: value
      };
    });
  };

  React.useEffect(() => {
    setHotelFilters(hotels);
  }, [hotels, setHotelFilters]);

  React.useEffect(() => {
    if (
      filters.startDate !== "" &&
      filters.exitDate !== "" &&
      filters.exitDate < filters.startDate
    ) {
      setHotelFilters("");
      setMessage(
        "La fecha de salida no puede ser inferior a la fecha de entrada. Ingrese una fecha nuevamente"
      );
      return true;
    } else {
      setMessage("");
    }

    const result = hotels.filter(
      (data) =>
        ((filters.country !== "todos" && data.country === filters.country) ||
          filters.country === "todos") &&
        ((filters.price !== "0" && data.price === Number(filters.price)) ||
          filters.price === "0") &&
        ((filters.size === "1" && data.rooms <= 10) ||
          (filters.size === "2" && data.rooms > 10 && data.rooms <= 20) ||
          (filters.size === "3" && data.rooms > 20) ||
          filters.size === "0") &&
        ((filters.startDate !== "" &&
          filters.exitDate !== "" &&
          new Date(filters.startDate).getTime() <= data.availabilityFrom &&
          new Date(filters.exitDate).getTime() <= data.availabilityTo) ||
          (filters.startDate === "" && filters.exitDate === ""))
    );
    setHotelFilters(result);
  }, [filters, hotels, setHotelFilters]);

  return (
    <FilterContainer>
      <FilterBody>
        <FilterTheme>
          <FontAwesomeIcon icon={faSignInAlt} color="gray" />
          <FilterDate
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={(e) => handleChange(e.target.name, e)}
          ></FilterDate>
        </FilterTheme>

        <FilterTheme>
          <FontAwesomeIcon icon={faSignOutAlt} color="gray" />
          <FilterDate
            type="date"
            name="exitDate"
            value={filters.exitDate}
            onChange={(e) => handleChange(e.target.name, e)}
          ></FilterDate>
        </FilterTheme>

        <FilterTheme>
          <FontAwesomeIcon icon={faGlobe} color="gray" />
          <FilterSelect
            name="country"
            value={filters.country}
            onChange={(e) => handleChange(e.target.name, e)}
          >
            <option value="todos">Todos los Países</option>
            {[...new Set(hotels.map((item) => item.country))].map((element) => (
              <option key={element}>{element}</option>
            ))}
          </FilterSelect>
        </FilterTheme>

        <FilterTheme>
          <FontAwesomeIcon icon={faDollarSign} color="gray" />
          <FilterSelect
            name="price"
            value={filters.price}
            onChange={(e) => handleChange(e.target.name, e)}
          >
            <option value="0">Cualquier Precio</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
          </FilterSelect>
        </FilterTheme>

        <FilterTheme>
          <FontAwesomeIcon icon={faBed} color="gray" />
          <FilterSelect
            name="size"
            value={filters.size}
            onChange={(e) => handleChange(e.target.name, e)}
          >
            <option value="0">Cualquier Tamaño</option>
            <option value="1">Hotel Pequeño</option>
            <option value="2">Hotel Mediano</option>
            <option value="3">Hotel Grande</option>
          </FilterSelect>
        </FilterTheme>

        <ResetButton
          name="limpiarCampos"
          onClick={() => {
            setFilters(initialState);
          }}
        >
          Reset
        </ResetButton>
      </FilterBody>
      {message !== "" ? <ErrorMensaje>{message}</ErrorMensaje> : false}
    </FilterContainer>
  );
}
