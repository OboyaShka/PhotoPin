import React from 'react';
import fetch from 'isomorphic-fetch';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import Modal from './Modal/modal.css'

class PrivatePlaceMarkers extends React.Component {

    constructor(){
        super()
        this.state={
            placemarkers:[],
        }
        let photosUrlArray = new Array();

        //this.loadPlaceMarkers()
    } 
  
    loadPlaceMarkers(){
        fetch(`http://178.248.1.62:8080/placemarkers`).then((response)=>{
            if(response.status >= 400){
                throw new Error('Bad response From Server')
            }
            return response.json();
        }).then(( placemarkers )=> {
            this.setState({placemarkers:  placemarkers});
        })
    }
    /*
    componentDidUpdate(){
        this.loadPlaceMarkers();
    }*/
    
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
                <div>
                {this.state.placemarkers.map((item, index)=>(   
                    item.users_permissions_user.id === this.props.user.id ? 
                    <Marker
                    key={item.id}
                    position ={{lat: parseFloat(item.latCur),lng: parseFloat(item.lngCur) }}
                    onClick={this.modalActiveMarker.bind(this, item) } /> : ""
                ))} 
                
                <div className={this.state.modal_active ? "modal active"  : "modal" } onClick={this.modalActive.bind(this)}> 
                {  this.currentItem && 
                    <div className={this.state.modal_active ? "modal__content active"  : "modal__content" } onClick={e=>e.stopPropagation()}>
                        
                        <h1>{this.currentItem.name}</h1>
                        <p>{this.currentItem.description}</p>
                        {this.currentItem.photos.map((item, index)=>( 
                            <div key={index}>
                               <img style={{ objectFit: "cover", width: "700px", height: "400px"}} src={`http://178.248.1.62:8080${item.url}`}/>
                            </div>
                        ))}
                        <p>{this.currentItem.users_permissions_user.username}</p>
                    </div> }    
                </div>
                </div>
        )
        
    } 
}
//id,name,latCur,lngCur,description, photos

export default PrivatePlaceMarkers;