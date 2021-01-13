import './App.css';
import PlaceMarkers from './components/placemarkers'
import NewPlaceMarkers from './components/newplacemarkers'
import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import MapStyles from './MapStyles'
import Modal from './components/Modal/modal';
import { useState, useCallback } from 'react'

const libraries=["places"]


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


export default function App() {
  const { isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyANk4tP5-akhFeXnefqXMwGDl0MecsszHU",
    libraries,
  })
  
  // const [centerMap, setCenterMap]= React.useState([])
  // onMouseUp={

  //   (event)=>{
     
  //     setCenterMap(
  //       {
  //         lat: event.latLng.lat(),
  //         lng: event.latLng.lng(),
  // })
  // }
  // }
  // center={
  //   {
  //     lat:centerMap.lat, lng:centerMap.lng
  //   }

  const [markers, setMarkers]= React.useState([])
  const [modalActive, setModalActive]= React.useState(false)

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps"



  


  return (
    <div className="App">
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
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
          })}}
          
          >
           <PlaceMarkers />

           <Marker
           position={{lat:markers.lat, lng:markers.lng}}/>

     

        </GoogleMap>

        
      </Modal>
    </div>
  );
  

}
