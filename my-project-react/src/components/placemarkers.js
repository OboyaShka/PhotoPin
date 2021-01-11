import React from 'react';
import fetch from 'isomorphic-fetch';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'

class PlaceMarkers extends React.Component {

    constructor(){
        super()
        this.state={
            placemarkers:[
            ],
            
        }
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

    render() {
        const{selected,setSelected}=this.props
        return(
            
                this.state.placemarkers.map(({id,name,latCur,lngCur,description, photos})=>(
                    <Marker
                    key={id}
                    position ={{lat: latCur,lng: lngCur }}
                    onClick={()=>{
                        <InfoWindow position ={{lat: latCur,lng: lngCur }}>
                        <div>
                            {console.log(name, latCur, lngCur, description)}
                            <h1>HAHAHAHA</h1>
                            </div>
                        </InfoWindow>
                    }}
                    />              
                ))
        )
        
    } 
}
{/* <Marker
key={id}
position ={{lat: latCur,lng: lngCur }}
onClick={()=>{
    setSelected(this.state.placemarkers)
}}
/> 

))}
{
selected ? 
(<InfoWindow position ={{lat: selected.latCur,lng: selected.lngCur }}>
    <div>
        <h1>HAHAHAHA</h1>
        </div>
</InfoWindow>): null
} */}

{/* <InfoWindow position ={{lat: latCur,lng: lngCur }}>
                            {console.log(1)}
                        <div>
                            <h1>HAHAHAHA</h1>
                            </div>
                        </InfoWindow>
 */}

export default PlaceMarkers;