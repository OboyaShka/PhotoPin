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
        console.log(`http://localhost:20000/uploads/${this.state.file.name}`)

    }

    render(){
        return (
            <div className="FileUpload">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="file"/>
                    <button>Загрузить</button>
                </form>
                { this.state.file ? 
                <img src={`http://localhost:20000/uploads/${this.state.file.name}`} />
                :""}
            </div>
        )
    }
    //<img src={`http://localhost:20000${this.upload_res.data[0].url}`} />
}