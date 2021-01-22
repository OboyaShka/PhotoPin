import React from 'react';
import fetch from 'isomorphic-fetch';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import Modal from './Modal/modal.css'
import axios from 'axios'



class NewPlacemarkers extends React.Component {

    constructor(){
        super()
        this.state={
            data:{},
            file:null
        }

    } 
  

    componentDidMount(){
    
    }

    handleChange =(event)=>{
        this.setState({file: event.target.files[0]})
    }

    handleSubmit = async (event)=>{

        event.preventDefault()
        const data=new FormData()
        data.append('files', this.state.file)

        const upload_res = await axios({
            method: 'POST',
            url:"http://178.248.1.62:8080/upload",
            data
        })

        this.photoLoad=upload_res.data[0]
        this.photoUrl=upload_res.data[0].url

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
  
        let result = fetch(`http://178.248.1.62:8080/placemarkers`,
        {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            "name": this.state.data.name,
            "latCur":this.props.latNew,
            "lngCur":this.props.lngNew,
            "description":this.state.data.description,
            "photos":[
                    this.photoLoad       
            ],
            "users_permissions_user": this.props.user
        })
        })
        this.props.setModalActive(false);
        
        window.location.href=window.location.href

        this.setState(this.state.data={}, this.state.file= null);
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
                <div className="FileUpload">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="file"/>
                    <button>Загрузить</button>
                </form>
                { this.photoUrl ? 
                <img style={{ objectFit: "cover", width: "100px", height: "80px"}} src={`http://178.248.1.62:8080${this.photoUrl}`} />
                :""}
                 </div>
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

export default NewPlacemarkers;