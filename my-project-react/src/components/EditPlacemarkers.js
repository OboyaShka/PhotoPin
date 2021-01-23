import PrivatePlaceMarkers from './PrivatePlacemarkers'
import ListPlacemarkers from './ListPlacemarkers'
import EditModalPlacemarkers from './EditModalPlacemarkers'
import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import MapStyles from '../MapStyles'
import Modal from './Modal/modal';
import { useState, useCallback } from 'react'
import "../styles.css";
import { useCurrentUser } from "./CurrentUser";
import { render } from 'react-dom';
import Icon from '../images/pin1.png';

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






export default function EditPlacemarkers( itemList ) {
    
    
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
    
    let center={
        lat: parseFloat(itemList.itemList.latCur),
        lng: parseFloat(itemList.itemList.lngCur)
      } 

   
    // function changeCenter()
    // {
    //     center={
    //         lat: parseFloat(markers.lat),
    //         lng: parseFloat(markers.lng)
    //       }
    // }
    // , 
    // changeCenter.bind(this)
  
      return (
      
        <div className="list">  
    <button className="button1" onClick={()=>setModalActive(true)}>Изменить точку</button>
    <Modal active={modalActive} setActive={setModalActive}>
         
        <EditModalPlacemarkers 
            user={user} 
            callback={itemList.updateList}
            setModalActive={setModalActive} 
            idEdit={itemList.itemList.id}
            nameEdit={itemList.itemList.name}
            latEdit={itemList.itemList.latCur} 
            lngEdit={itemList.itemList.lngCur} 
            latNew={markers.lat} 
            lngNew={markers.lng} 
            descriptionEdit={itemList.itemList.description}
            photosEdit={itemList.itemList.photos}
            />
        <GoogleMap mapContainerStyle={mapCreateContainerStyle} 
          zoom={14} 
          center={
                center
            }
          options={options}
          onClick={(event)=>[
              setMarkers(
                {
                  lat: parseFloat(event.latLng.lat()),
                  lng: parseFloat(event.latLng.lng()),
          })
          ]} >

            <Marker icon={Icon} position={{lat:parseFloat(itemList.itemList.latCur), lng: parseFloat(itemList.itemList.lngCur)}}/>
           <Marker icon={Icon} position={{lat:parseFloat(markers.lat), lng: parseFloat(markers.lng)}}/>
        </GoogleMap>
    </Modal> 

      </div>
       
    );
        
        
}