import axios from 'axios';

const setAuthToken = token => {
  if ( token ) {
    // Do for every request
    axios.defaults.headers.common['Authorization'] = token;

  } else {
    // Delete Auth header in request
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
