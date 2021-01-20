import './App.css';
import MyPlacemarkers from './components/MyPlacemarkers'
import React from 'react';
import Login from './Login'
import Header from "./components/Header";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Map from "./components/Map";
import { useCurrentUser, useDispatchCurrentUser } from "./components/CurrentUser";

function PrivateRoute({children, ...rest}){
  let currentUser = useCurrentUser();

  return(
    <Route
    {...rest}
    render={({location}) =>
      currentUser.isAuthenticated ? (
        children
      ) : (
        setTimeout(() => {  <Redirect
          to={{
            pathname: "/login",
            state: {from: location}
          }}
        /> }, 200)
      )
  
  }      
    />
  )
}


export default function App() {
  
  return (
    <Router>
      <>
      <Header/>
      <Switch>
      <PrivateRoute path="/placemarkers">
        <MyPlacemarkers/>
      </PrivateRoute>
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
