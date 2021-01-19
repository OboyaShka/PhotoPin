import './App.css';
import PlaceMarkers from './components/placemarkers'
import NewPlaceMarkers from './components/newplacemarkers'
import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import MapStyles from './MapStyles'
import Modal from './components/Modal/modal';
import { useState, useCallback } from 'react'
import Login from './Login'
import Header from "./components/Header";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Map from "./components/Map";



export default function App() {


  
  return (
    <Router>
      <>
      <Header/>
      <Switch>
      <Route path="/login">
            <Login />
      </Route>
      <Route path="/">
      <Map/>
      </Route>
      </Switch>
      </>
    </Router>
  );
//   (event)=>{
         
//     setCenterMap(
//       {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       })
// }


// {
//   lat:centerMap.lat, lng:centerMap.lng
// }
}
