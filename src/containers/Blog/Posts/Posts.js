import React,{Component} from 'react'
import axios from 'axios'
import Post from '../../../components/Post/Post'
import './Posts.css'
import {Link} from 'react-router-dom'
import FullPost from '../FullPost/FullPost'
import {Route} from 'react-router-dom'

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        let posts = axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            posts = response.data.slice(0,4)
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Dev'
                }
            })
            this.setState({posts: updatedPosts})
        })
        .catch(error => {
            console.log(error);
        })
    }

    postSelectedHandler = (id) => {
        //this.setState({selectedPostId: id})
        //this.props.history.push({pathname: '/posts/' + id})
        this.props.history.push('/posts/'+id)
    }

    render() {
        let posts = <p style={{textAlign:'center'}}>Something Went Wrong</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                //<Link to={'/posts/'+post.id} key={post.id}>
                    <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author} 
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                //</Link>
            )
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>            
                <Route path={this.props.match.url + '/:id'} component={FullPost} exact/>
            </div>

        )
    }
}

export default Posts;