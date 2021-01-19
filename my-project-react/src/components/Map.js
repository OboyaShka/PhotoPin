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
    height: "85vh"
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
      <h1>Да начнётся работа</h1>
      <button onClick={()=>setModalActive(true)}>Добавить метку</button>

      <GoogleMap mapContainerStyle={mapContainerStyle} 
      zoom={14} 
      center={center}
      options={options}
      
      >   
      <PlaceMarkers />
      </GoogleMap>
      
      <Modal active={modalActive} setActive={setModalActive}>

        <NewPlaceMarkers  setModalActive={setModalActive} latNew={markers.lat} lngNew={markers.lng} />
        <GoogleMap mapContainerStyle={mapCreateContainerStyle} 
          zoom={14} 
          center={
               center
            }
          options={options}
          onClick={(event)=>{
              setMarkers(
                {
                  lat: parseFloat(event.latLng.lat()),
                  lng: parseFloat(event.latLng.lng()),
          })}} >
          <PlaceMarkers />

           <Marker position={{lat:parseFloat(markers.lat), lng: parseFloat(markers.lng)}}/>
        </GoogleMap>
      </Modal>
      </main>
    );
}