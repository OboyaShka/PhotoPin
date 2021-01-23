import React from 'react';
import fetch from 'isomorphic-fetch';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import Modal from './Modal/modal.css'
import IconLike from '../icon/logo512.png';
import Icon1 from '../images/pin1.png';
import Icon2 from '../images/pin2.png';
import Icon3 from '../images/pin3.png';
import LikeIcon from '../icon/like_icon.png';
import DisLikeIcon from '../icon/dislike_icon.png';
const moment = require('moment');
moment.locale("ru");

class Placemarkers extends React.Component {

    constructor() {
        super()
        this.state = {
            placemarkers: [],
            data: [],
        }
        let photosUrlArray = new Array();

        this.loadPlaceMarkers()
    }

    loadPlaceMarkers() {
        fetch(`http://178.248.1.62:8080/placemarkers`).then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response From Server')
            }
            return response.json();
        }).then((placemarkers) => {
            this.setState({ placemarkers: placemarkers });
        })
    }


    componentDidUpdate() {

    }


    /*
    componentDidMount() {
        this.loadPlaceMarkers();
    }*/


    modalActiveMarker(i, e) {
        this.currentItem = i;

        this.setState({ ...this.state, modal_active: !this.state.modal_active })
    }

    modalActive(e) {
        this.setState({ ...this.state, modal_active: !this.state.modal_active })
    }
    changeValueContent(e) {
        this.state.data.content = e.target.value;
        this.setState({ ...this.state });
    }



    saveComment(e) {

        let result = fetch('http://178.248.1.62:8080/comments',
            {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "content": this.state.data.content,
                    "placemarker": this.currentItem,
                    "author": this.props.user.username
                })
            })

        this.loadPlaceMarkers();

        this.setState(this.state.data = {}, this.state.file = null, this.state.placemarkers, this.modal_active)

    }

    likeAction() {

            this.currentItem.likes = this.currentItem.likes + 1
    

        let result = fetch(`http://178.248.1.62:8080/placemarkers/${this.currentItem.id}`,
            {
                method: 'put',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "likes": this.currentItem.likes,

                })
            })

        this.setState({ ...this.state, like_active: !this.state.like_active })
    }

    dislikeAction() {


        this.currentItem.likes = this.currentItem.likes - 1
     


        let result = fetch(`http://178.248.1.62:8080/placemarkers/${this.currentItem.id}`,
            {
                method: 'put',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "likes": this.currentItem.likes,

                })
            })

        this.setState({ ...this.state, like_active: !this.state.like_active })
    }

    render() {
        return (
            <div className="placemarkers">
                {this.state.placemarkers.map((item, index) => (
                    <Marker
                        key={item.id}
                        position={{ lat: parseFloat(item.latCur), lng: parseFloat(item.lngCur) }}
                        onClick={this.modalActiveMarker.bind(this, item)}
                        icon={{
                            url: Icon1,
                            scaledSize: new window.google.maps.Size(50, 50)
                        }
                        }
                    />
                ))}

                <div className={this.state.modal_active ? "modal active" : "modal"} onClick={this.modalActive.bind(this)}>
                    {this.currentItem &&
                        <div className={ this.state.modal_active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>

                            <h1 className="name">{this.currentItem.name}</h1>
                            {this.currentItem.photos.map((item, index) => (
                                console.log(item.url),
                                <div key={index}>
                                    <img className="image" style={{ objectFit: "cover", width: "700px", height: "400px" }} src={`http://178.248.1.62:8080${item.url}`} />
                                </div>
                            ))}
                                <h4 className="description">Описание:</h4>
                                <p className="description-text">{this.currentItem.description}</p>

                                <h5 className="author">{"Автор: "} 
                                    <h5 className="text"><b>{this.currentItem.users_permissions_user.username}</b></h5>
                                </h5>
                                <hr size="3px" width="100%" align="left"/>
                                <p>
                                <button  className="like" onClick={this.likeAction.bind(this)}>
                                    <img src={LikeIcon}/>
                                </button>
                                    {this.currentItem.likes} Нравится 
                                <button  className="like" onClick={this.dislikeAction.bind(this)}>
                                    <img src={DisLikeIcon}/>
                                </button>
                                </p>
                                <div class="scroll">
                                {this.currentItem.comments.map((item, ix) => (
                                    <div key={ix} class="realcomment">
                                    <div className={this.props.user.username === item.author? "mycomment":"comment"} >
                                        <div class="authorAll"><b>{item.author}</b>               
                                        <div class="dateAll">{moment(item.published_at).format('ll')}</div>
                                        </div>     
                                        <div class="contentAll">{item.content}</div>

                                    </div>
                                    </div >
                                ))}
                                </div>
                                <div>Написать комментарий: </div>
                                <div class="input-group mb-3">
                                <input class="form-control"  type="text" name={`input`} id={`input`} required=""
                                    value={this.state.data.content || ""} onChange={this.changeValueContent.bind(this)} >
                                </input>
                                <button class="btn btn-outline-secondary"  onClick={this.saveComment.bind(this)}>Отправить</button>
                                </div>
                        </div>}
                </div>
            </div>
        )

    }
}
//id,name,latCur,lngCur,description, photos


export default Placemarkers;