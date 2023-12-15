import React from "react";
import Venue from "./Venue";
import AdminButton from "./AdminButton";
import { useNavigate } from "react-router-dom";

const VenueList = ({ venues, admin, onSelectVenue }) => {
  const navigate = useNavigate();

  const performClick = (evt) => {
    if (evt.target.name === "Mekan Ekle") {
      return navigate("/admin/addupdate");
    } 
  };

  return (
    <div>
      {venues.map((venue, index) => (
        <Venue key={index} venue={venue} admin={admin} onClick={(evt) => performClick(evt, venue)} />
      ))}

      {admin ? (
        <div className="col-xs-12 col-sm-12">
          <div className="row">
            <div className="column pull-right">
              <AdminButton
                name="Mekan Ekle"
                type="success"
                onClick={(evt) => performClick(evt, null)}
              />
            </div>
          </div>
        </div>
      ) : ( 
        ""
      )}
    </div>
  );
};

export default VenueList;
