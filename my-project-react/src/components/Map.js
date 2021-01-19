import PlaceMarkers from './placemarkers'
import NewPlaceMarkers from './newplacemarkers'
import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import MapStyles from '../MapStyles'
import Modal from './Modal/modal';
import { useState, useCallback } from 'react'
import "../styles.css";


const libraries=["places","visualization","drawing","geometry","localContext"]


const mapContainerStyle = {
    width: "100vw",
    height: "95vh"
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
      
      const [centerMap, setCenterMap]= React.useState([])
     
    
      const [markers, setMarkers]= React.useState([])
      const [modalActive, setModalActive]= React.useState(false)
    
      if (loadError) return "Error loading maps"
      if (!isLoaded) return "Loading Maps"
    


    return (



        <main>

      <GoogleMap mapContainerStyle={mapContainerStyle} 
      zoom={14} 
      center={center}
      options={options}
      
      >   
      <PlaceMarkers />
      </GoogleMap>
      
      
      </main>
    );
}