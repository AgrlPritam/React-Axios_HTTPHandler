import Axios from 'axios';
import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidUpdate() {
        //Below logic is to avoid infinite loop (check network in browser console) which will be created if we try to update the state inside componentDidUpdate
        if(this.props.id) {
            if((!this.state.loadedPost) || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('/posts/'+this.props.id)
                .then(response => {
                    this.setState({loadedPost: response.data})
                })
            }

        }
    }

    postDeleteHandler = () => {
        axios.delete('/posts/'+this.props.id)
            .then(response => {
                console.log(response);
            })
    }
    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.postDeleteHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        return post;
    }
}

export default FullPost;