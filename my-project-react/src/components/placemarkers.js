import React from 'react';
import fetch from 'isomorphic-fetch';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import Modal from './Modal/modal.css'

class PlaceMarkers extends React.Component {

    constructor(){
        super()
        this.state={
            placemarkers:[],
        }
        let photosUrlArray = new Array();
    } 
  

    componentDidMount(){
        fetch('http://localhost:20000/placemarkers').then((response)=>{
            if(response.status >= 400){
                throw new Error('Bad response From Server')
            }
            return response.json();
        }).then(( placemarkers )=> {
            this.setState({placemarkers:  placemarkers});
        })
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
        const{selected,setSelected}=this.props
        return(
                <div>
                {this.state.placemarkers.map((item, index)=>(
                    
                    <Marker
                    key={item.id}
                    position ={{lat: item.latCur,lng: item.lngCur }}
                    onClick={this.modalActiveMarker.bind(this, item) }
                    />              
                ))}
                <div className={this.state.modal_active ? "modal active"  : "modal" } onClick={this.modalActive.bind(this)}> 
                {  this.currentItem && 
                    <div className={this.state.modal_active ? "modal__content active"  : "modal__content" } onClick={e=>e.stopPropagation()}>
                        
                        <h1>{this.currentItem.name}</h1>
                        <p>{this.currentItem.description}</p>
                        {this.currentItem.photos.map((item, index)=>( 
                            <div key={index}>
                               <img style={{ objectFit: "cover", width: "700px", height: "400px"}} src={`http://localhost:20000${item.url}`}/>
                            </div>
                        ))}
                    </div> }    
                </div>
                </div>
        )
        
    } 
}
//id,name,latCur,lngCur,description, photos


export default PlaceMarkers;