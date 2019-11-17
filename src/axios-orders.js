import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-edd41.firebaseio.com/'
});

export default instance;