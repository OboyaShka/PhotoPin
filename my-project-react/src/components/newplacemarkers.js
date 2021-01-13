import React from 'react';
import fetch from 'isomorphic-fetch';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import Modal from './Modal/modal.css'
import FileUpload from './fileupload'

class NewPlaceMarkers extends React.Component {

    constructor(){
        super()
        this.state={
            data:{}
        }

    } 
  

    componentDidMount(){
        
    }


    changeValueDescription( e ){
        this.state.data.description = e.target.value;
        this.setState({ ...this.state });
    }
    
    changeValueName( e ){
        this.state.data.name = e.target.value;
        this.setState({ ...this.state });
    }

    saveStateDocument(e) {
        // let formData = new FormData();
        // formData.append("name",this.state.data.name);
        // formData.append("latCur",this.props.latNew);
        // formData.append("lngCur",this.props.lngNew);
        let result = fetch('http://localhost:20000/placemarkers',
        {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            "name": this.state.data.name,
            "latCur":this.props.latNew,
            "lngCur":this.props.lngNew,
            "description":this.state.data.description
        })
        })
        this.props.setModalActive(false);
        
    }

    render() {
        return(
            <div>
                <div>
                    <div>Введите название места:</div>
                    <input  type="text" name="input1" id="input1" required=""
                         value={ this.state.data.name || "" } onChange={ this.changeValueName.bind( this ) }/>
                    <div>Введите описание места:</div>
                    <input  type="text" name="input2" id="input2" required=""
                         value={ this.state.data.description || "" } onChange={ this.changeValueDescription.bind( this ) }/>
                </div>
                <FileUpload/>
                <div>
                    
                    <button
                        onClick={ this.saveStateDocument.bind( this ) }>Сохранить
                    </button>
                
                </div>
            </div>
        )
        
    } 
}

//<button className={ buttonActionsClass } style={ { display: ( this.state.data._ID || this.state.data.id ? 'inline-flex' : 'none' ) } }
 //                       onClick={ this.removeDocument.bind( this ) }>Удалить</button>

export default NewPlaceMarkers;