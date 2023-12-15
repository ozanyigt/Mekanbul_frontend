import React, { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import VenueList from "./VenueList";
import Venue from "./Venue";
import VenueDataService from "../services/VenueDataService";
import VenueReducer from "../services/VenueReducer";

const useCookies = (key, defaultValue) => {
  const [cookie, setCookie] = useState(localStorage.getItem(key) || defaultValue);
  useEffect(() => {
    localStorage.setItem(key, cookie);
  }, [cookie, key]);
  return [cookie, setCookie];
};

const Admin = () => {
  const [searchVenue, setSearchVenue] = useCookies("searchVenue", "");
  const [venues, dispatchVenues] = useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatchVenues({ type: "FETCH_INIT" });
      try {
        const result = await VenueDataService.listJsonVenues();
        dispatchVenues({
          type: "FETCH_SUCCESS",
          payload: result.data,
        });
      } catch (error) {
        dispatchVenues({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, []);

  const filteredVenues = venues.data.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchVenue.toLowerCase())
  );

  return (
    <div>
      <Header headerText="Mekan Bul-Admin" motto="Mekanlarınızı yönetin!" />
      <hr />
      {venues.isError ? (
        <p>
          <strong>Bir şeyler ters gitti! ...</strong>
        </p>
      ) : venues.isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) : (
        venues.isSuccess && (
          <div className="row">
            <VenueList
              venues={filteredVenues}
              admin={true}  
              onSelectVenue={(selected) => {setSelectedVenue(selected);
               
              }}
            />
            {selectedVenue && <Venue venue={selectedVenue} admin={true} />}
          </div>
        )
      )}
    </div>
  );
};

export default Admin;
