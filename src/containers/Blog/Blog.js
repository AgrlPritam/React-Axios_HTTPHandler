import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts'
import {Route, NavLink, Switch} from 'react-router-dom'
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/" exact>Posts</NavLink></li>
                            <li><NavLink to={{pathname: '/new-post', hash:'#submit', search:'?quick-submit=true'}}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" component={Posts} exact/>
                <Switch>
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/:id" component={FullPost} exact/>
                </Switch>

            </div>
        );
    }
}

export default Blog;