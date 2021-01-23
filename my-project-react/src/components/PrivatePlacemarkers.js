import React from 'react';
import fetch from 'isomorphic-fetch';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import Modal from './Modal/modal.css'
import Icon from '../images/pin1.png';


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
                <div className="placemarkers">
                {this.state.placemarkers.map((item, index)=>(   
                    item.users_permissions_user.id === this.props.user.id ? 
                    <Marker
                    icon={Icon}
                    key={item.id}
                    position ={{lat: parseFloat(item.latCur),lng: parseFloat(item.lngCur) }}
                    onClick={this.modalActiveMarker.bind(this, item) } /> : ""
                    
                ))} 
                
                <div className={this.state.modal_active ? "modal active"  : "modal" } onClick={this.modalActive.bind(this)}> 
                {  this.currentItem && 
                    <div className={this.state.modal_active ? "modal__content active"  : "modal__content" } onClick={e=>e.stopPropagation()}>
                        
                        <h1 className="name">{this.currentItem.name}</h1>
                        {this.currentItem.photos.map((item, index)=>( 
                            <div key={index}>
                               <img style={{ objectFit: "cover", width: "700px", height: "400px"}} src={`http://178.248.1.62:8080${item.url}`}/>
                            </div>
                        ))}
                        <h4 className="description">Описание:</h4>
                                <p >{this.currentItem.description}</p>

                                <h5 className="author">{"Автор: "} 
                                    <h5 className="text"><b>{this.currentItem.users_permissions_user.username}</b></h5>
                                </h5>
                         
                    </div> }    
                </div>
                </div>
        )
        
    } 
}
//id,name,latCur,lngCur,description, photos

export default PrivatePlaceMarkers;