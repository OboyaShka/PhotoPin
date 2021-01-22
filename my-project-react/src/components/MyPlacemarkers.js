import PrivatePlaceMarkers from './PrivatePlacemarkers'
import ListPlacemarkers from './ListPlacemarkers'
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



export default function  MyPlacemarkers( then ) {
    
    const { isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyANk4tP5-akhFeXnefqXMwGDl0MecsszHU",
        libraries,
     
      })
      const user = useCurrentUser();
      const [centerMap, setCenterMap]= React.useState([])
     
    
      const [markers, setMarkers]= React.useState([])
      const [modalActive, setModalActive]= React.useState(false)
    
      if (loadError) return "Error loading maps"
      if (!isLoaded) return "Loading Maps"
    
    

    return (
        <main>
      <button onClick={()=>setModalActive(true)}>Добавить точку</button>
    
      <ListPlacemarkers user={user}/>
      
      <Modal active={modalActive} setActive={setModalActive}>

        <NewPlacemarkers 
          user={user} 
          setModalActive={setModalActive} 
          latNew={markers.lat} 
          lngNew={markers.lng} />
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
          <PrivatePlaceMarkers user={user}/>

           <Marker position={{lat:parseFloat(markers.lat), lng: parseFloat(markers.lng)}}/>
        </GoogleMap>
      </Modal>

      </main>
    );
}