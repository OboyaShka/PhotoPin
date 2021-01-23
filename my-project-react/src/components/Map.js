import PlaceMarkers from './Placemarkers'
import NewPlacemarkers from './NewPlacemarkers'
import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import MapStyles from '../MapStyles'
import Modal from './Modal/modal';
import { useState, useCallback } from 'react'
import "../styles.css";
import { useCurrentUser } from "./CurrentUser";

const libraries=["places","visualization","drawing","geometry","localContext"]


const mapContainerStyle = {
    width: "100vw",
    height: "92vh"
}

const mapCreateContainerStyle = {
  width: "800px",
  height: "800px"
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



export default function  Map() {
    
    const { isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyANk4tP5-akhFeXnefqXMwGDl0MecsszHU",
        libraries,
     
      })
      const user = useCurrentUser();

      if (loadError) return "Error loading maps"
      if (!isLoaded) return "Loading Maps"
      
      
    return (



        <main>

      <GoogleMap mapContainerStyle={mapContainerStyle} 
      zoom={14} 
      center={center}
      options={options}
      
      >   
      <PlaceMarkers user={user}/>
      </GoogleMap>
      
      
      </main>
    );
}