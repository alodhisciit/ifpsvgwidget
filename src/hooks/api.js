import axios from 'axios';

const hostname = window.location.hostname;

export default axios.create({
  baseURL:
    hostname === 'localhost'
      ? 'http://localhost:5000/'
      : 'https://ifp-node-backend.herokuapp.com/',
});
