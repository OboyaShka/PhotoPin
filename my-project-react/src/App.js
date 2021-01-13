import './App.css';
import PlaceMarkers from './components/placemarkers'
import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import MapStyles from './MapStyles'

const libraries=["places"]


const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}

const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true
}


const center={
    lat: 56.837650,
    lng: 60.594528 
}  


export default function App() {
  const { isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyANk4tP5-akhFeXnefqXMwGDl0MecsszHU",
    libraries,
  })
  



  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps"

  function postData(){
    
  }
  
  return (
    <div className="App">
      <h1>Да начнётся работа</h1>
      <GoogleMap map="MainMap" mapContainerStyle={mapContainerStyle} 
      zoom={14} 
      center={center}
      options={options}
      >
      
      <PlaceMarkers/>


      </GoogleMap>
      
      <input type="text" name="name"></input>
      <input type="text" name="lat"></input>
      <input type="text" name="lng"></input>
      <input type="submit" onClick={postData}></input>
      
    </div>
  );
}
