import React from 'react'
import axios from 'axios'

export default class FileUpload extends React.Component{
    state={
        file:null
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
            url:"http://localhost:20000/upload",
            data
        })

        this.photoUrl=upload_res.data[0].url

    }

    render(){
        const { uploadUrl } = this.props;
        return (
            <div className="FileUpload">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="file"/>
                    <button>Загрузить</button>
                </form>
                { this.photoUrl ? 
                <img style={{ objectFit: "cover", width: "100px", height: "80px"}} src={`http://localhost:20000${this.photoUrl}`} /> && (uploadUrl= this.photoUrl) 
                :""}
            </div>
        )
    }

}