

import React from 'react';
import fetch from 'isomorphic-fetch';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import Modal from './Modal/modal.css'
import EditPlacemarkers from './EditPlacemarkers'

class ListPlacemarkers extends React.Component {

    constructor(){
        super()
        this.state={
            placemarkers:[],
        }
        let photosUrlArray = new Array();

        this.loadPlaceMarkers()
    } 
  
    loadPlaceMarkers(){
        fetch('http://localhost:20000/placemarkers').then((response)=>{
            if(response.status >= 400){
                throw new Error('Bad response From Server')
            }
            return response.json();
        }).then(( placemarkers )=> {
            this.setState({placemarkers:  placemarkers});
        })
    }

    componentDidMount(){
        this.loadPlaceMarkers();
    }

    
    modalActiveMarker( i, e )
    {  
        this.currentItem=i;

        this.setState({ ...this.state,modal_active: !this.state.modal_active })
    }

    modalActive(  e )
    {
        this.setState({ ...this.state, modal_active: !this.state.modal_active})
    }
 


    render() {
        return(
                <ul>
                {this.state.placemarkers.map((itemList, index)=>(   
                    itemList.users_permissions_user.id === this.props.user.id ? 
                    <li key={index}>
                        <div>{itemList.name}</div>
                        <div>{itemList.description}</div>
                        {itemList.photos.map((item, index)=>( 
                            <div key={index}>
                               <img style={{ objectFit: "cover", width: "700px", height: "400px"}} src={`http://localhost:20000${item.url}`}/>
                            </div>
                        ))}
                        <EditPlacemarkers itemList={itemList} updateList={this.loadPlaceMarkers.bind(this)}/> 
            
                    </li>: ""
                ))} 
                </ul>
        )
        
    } 
}
//id,name,latCur,lngCur,description, photos

export default ListPlacemarkers;