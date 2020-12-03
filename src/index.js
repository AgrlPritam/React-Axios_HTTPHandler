import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
axios.defaults.headers.post['Content-Type'] = 'application/json'

//Intercepting all components and area where axios is present. Errors generating from here will only be limited to internet connectivity and so
axios.interceptors.request.use(request => {
    console.log(request);
    return request      //Always return the request with axios interceptors as you are blocking the request otherwise
}, error => {
    console.log(error);
    return Promise.reject(error)
})

//errors generating from here will be from each component genrating axios CRUD Calls which has an error
axios.interceptors.response.use(response => {
    console.log(response);
    return response      
}, error => {
    console.log(error);
    return Promise.reject(error)
})

//Getting rid of an interceptor. Use eject by storing interceptor in a var first
// var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
