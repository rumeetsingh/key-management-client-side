import axios from 'axios';

export default axios.create({
    baseURL : 'https://foxedokmsapi.herokuapp.com/api',
})