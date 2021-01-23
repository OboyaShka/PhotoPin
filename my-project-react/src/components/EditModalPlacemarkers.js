import React from 'react';
import fetch from 'isomorphic-fetch';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import Modal from './Modal/modal.css'
import axios from 'axios'

/** 
* @param {int} value
* @param {int} total
*/

const calculatePercent = (value, total) => Math.round(value / total * 100)

class EditModalPlacemarkers extends React.Component {

    constructor(){
        super()
        this.state={
            data:{},
            file:null,
            percent: 0,
            loading: false
        }

    } 
  

    componentDidMount(){
    
    }

    handleChange =(event)=>{
        this.setState({file: event.target.files[0]})
    }

    handleSubmit = async (event)=>{

        event.preventDefault()
        this.setState({ loading: true })
        const data=new FormData()
        data.append('files', this.state.file)

        const upload_res = await axios({
            method: 'POST',
            url:`http://178.248.1.62:8080/upload`,
            data,
            onUploadProgress: (progress) => this.setState({ percent: calculatePercent(progress.loaded, progress.total) })
        })
        this.setState({ loading: false })
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
        
        let result = fetch(`http://178.248.1.62:8080/placemarkers/${this.props.idEdit}`,
        {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            "name":this.state.data.name ||  this.props.nameEdit ,
            "latCur":this.props.latNew || this.props.latEdit,
            "lngCur":this.props.lngNew || this.props.lngEdit,
            "description":this.state.data.description ||  this.props.descriptionEdit,
            "photos":[
                    this.photoLoad || this.props.photosEdit[0]  
            ],
            "users_permissions_user": this.props.user
        })
        })
        this.props.setModalActive(false);
        this.props.callback()
        this.setState(this.state.data={}, this.state.file= null);
    }

    deleteDocument(e) {
        
        let result = fetch(`http://178.248.1.62:8080/placemarkers/${this.props.idEdit}`,
        {
            method: 'delete',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            "name":this.state.data.name ||  this.props.nameEdit ,
            "latCur":this.props.latNew || this.props.latEdit,
            "lngCur":this.props.lngNew || this.props.lngEdit,
            "description":this.state.data.description ||  this.props.descriptionEdit,
            "photos":[
                    this.photoLoad || this.props.photosEdit[0]  
            ],
            "users_permissions_user": this.props.user
        })
        })
        this.props.setModalActive(false);
        setTimeout(() => {  this.props.callback() }, 200);
      
        this.setState(this.state.data={}, this.state.file= null);
    }


    

    render() {
        const { percent, loading } = this.state
        return(
            <div className="input">
                <div>
                    <div>Название места:</div>
                    <input  class="form-control" type="text" name={`input1${this.props.idEdit}`} id={`input1${this.props.idEdit}`}  required=""
                         value={ this.state.data.name || this.props.nameEdit || "" } onChange={ this.changeValueName.bind( this ) }/>
                    <div>Описание места:</div>
                    <textarea class="form-control"  type="text" name={`input2${this.props.idEdit}`}  id={`input2${this.props.idEdit}`}  required=""
                         value={ this.state.data.description ||this.props.descriptionEdit || "" } onChange={ this.changeValueDescription.bind( this ) } rows="3"/>
                </div>
                <div className="FileUpload">
                
                <form class="input-group file-input" onSubmit={this.handleSubmit}>     
                { this.props.photosEdit[0] ? 
                <img style={{ objectFit: "cover", width: "100px", height: "80px"}} src={`http://178.248.1.62:8080${this.props.photosEdit[0].url}`} />
                :""}
                    <input class="form-control img-input" onChange={this.handleChange} type="file"/>
                    <button class="btn btn-outline-secondary">Загрузить</button>
                </form>
                <div className="Progress">
                        <div className="Progress__Seek" style={{ width: `${percent}%` }}></div>
                    </div> 
               
                 </div>
                <div>
                    
                    <button className="button"
                        onClick={ this.saveStateDocument.bind( this ) }>Сохранить
                    </button>
                    <button className="button-red"
                        onClick={ this.deleteDocument.bind( this ) }>Удалить
                    </button>
                </div>
            </div>
        )
        
    } 
}

//<button className={ buttonActionsClass } style={ { display: ( this.state.data._ID || this.state.data.id ? 'inline-flex' : 'none' ) } }
 //                       onClick={ this.removeDocument.bind( this ) }>Удалить</button>

export default EditModalPlacemarkers;