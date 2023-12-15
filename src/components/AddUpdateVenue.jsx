import React, { useState, useEffect } from 'react';
import Header from './Header';
import VenueReducer from "../services/VenueReducer";
import VenuDataService from "../services/VenueDataService";
import { useParams, useLocation } from "react-router-dom";
import AdminButton from "./AdminButton";

function AddUpdateVenue() {
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [imkanlar, setImkanlar] = useState('');
  const [enlem, setEnlem] = useState('');
  const [boylam, setBoylam] = useState('');
  const [gunler1, setGunler1] = useState('');
  const [acilis1, setAcilis1] = useState('');
  const [kapanis1, setKapanis1] = useState('');
  const [kapali1, setKapali1] = useState(false);
  const [gunler2, setGunler2] = useState('');
  const [acilis2, setAcilis2] = useState('');
  const [kapanis2, setKapanis2] = useState('');
  const [kapali2, setKapali2] = useState(false);
  
  const handleVenueNameChange = (event) => {   
    setVenueName(event.target.value);
  };

  const handleVenueAddressChange = (event) => {  
    setVenueAddress(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Venue Name:', venueName);
    console.log('Venue Address:', venueAddress);
    console.log('Imkanlar:', imkanlar);
    console.log('Enlem:', enlem);
    console.log('Boylam:', boylam);
    console.log('Gunler-1:', gunler1);
    console.log('Acilis-1:', acilis1);
    console.log('Kapanis-1:', kapanis1);
    console.log('Is Kapali-1 Checked:', kapali1);
    console.log('Gunler-2:', gunler2);
    console.log('Acilis-2:', acilis2);
    console.log('Kapanis-2:', kapanis2);
    console.log('Is Kapali-2 Checked:', kapali2);
  };

  const inputStyle = {
    marginLeft: 80,
    width: '700px',
    height: '40px',
    borderRadius: '6px',
    fontSize: '16px',
    opacity: '0.7',
  };

  const inputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: '10px',
  };

  const labelStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'flex-end',
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: '90px',
  };

  const formContainerStyle = {
    marginRight: '200px',
  };

  const [venue, dispatchVenue] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const { id } = useParams(); 
  const location = useLocation();
  const venueData=venue.data[id - 1]
 
 
  React.useEffect(() => {
    if(id)
    {
      dispatchVenue({ type: "FETCH_INIT" });
      VenuDataService.listJsonVenues()
        .then((result) => {
          dispatchVenue({
            type: "FETCH_SUCCESS",
            payload: result.data,
          });
        })
        .catch(dispatchVenue({ type: "FETCH_FAILURE" }));
    }
 
  }, [id]);
  useEffect(() => {
    if (venue.isSuccess) {
      const coordinates =String(venueData.coordinates) 
      const [enlem,boylam]=coordinates.split(",")
      const exampleHourList=venueData.hours
      
  
      setVenueName(venueData.name);
      setVenueAddress(venueData.address);
      setImkanlar(venueData.foodanddrink)
      setEnlem(enlem)  
      setBoylam(boylam)
      setGunler1(exampleHourList[0].days)
      setAcilis1(exampleHourList[0].open)
      setKapanis1(exampleHourList[0].close)
      setKapali1(exampleHourList[0].closed)
      setGunler2(exampleHourList[1].days)
      setAcilis2(exampleHourList[1].open)
      setKapanis2(exampleHourList[1].close)
      setKapali2(exampleHourList[1].closed)
      
    }
  }, [venue.isSuccess]);

  return (
    <div>
      <Header headerText={id && venueData ? venueData.name+" Mekanını Güncelle" : "Yeni Mekan Ekle"}/> 
      <form style={formContainerStyle} onSubmit={handleFormSubmit}>  
        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Mekan Adı
            <input type="text" value={venueName} onChange={handleVenueNameChange} style={inputStyle} />
          </label>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Mekan Adresi
            <input type="text" value={venueAddress} onChange={handleVenueAddressChange} style={inputStyle} />
          </label>
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            İmkanlar
            <input type="text" value={imkanlar} onChange={(e) => setImkanlar(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Enlem
            <input type="text" value={enlem} onChange={(e) => setEnlem(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Boylam
            <input type="text" value={boylam} onChange={(e) => setBoylam(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Günler-1
            <input type="text" value={gunler1} onChange={(e) => setGunler1(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Açılış-1
            <input type="text" value={acilis1} onChange={(e) => setAcilis1(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Kapanış-1
            <input type="text" value={kapanis1} onChange={(e) => setKapanis1(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={checkboxContainerStyle}>
          <label style={labelStyle}>
            Kapalı-1
            <input
              style={{ width: "175px", height: "20px" }}
              type="checkbox"
              checked={kapali1}
              onChange={() => setKapali1(!kapali1)}
            />
          </label>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Günler-2
            <input type="text" value={gunler2} onChange={(e) => setGunler2(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Açılış-2
            <input type="text" value={acilis2} onChange={(e) => setAcilis2(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Kapanış-2
            <input type="text" value={kapanis2} onChange={(e) => setKapanis2(e.target.value)} style={inputStyle} />
          </label>
        </div>

        <div style={checkboxContainerStyle}>
          <label style={labelStyle}>
            Kapalı-2
            <input
              style={{ width: "175px", height: "20px" }}
              type="checkbox"
              checked={kapali2}
              onChange={() => setKapali2(!kapali2)}
            />
          </label>
        </div>

        <div className="col-xs-12 col-sm-12">
          <div className="row">
            <div className="column pull-right">
              <AdminButton
                name={id ? 'Mekanı Güncelle' : 'Mekanı Ekle'}
                type="success"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddUpdateVenue;
