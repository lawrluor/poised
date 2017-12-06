import { Platform } from 'react-native';

const API = Platform.OS === 'android'
  ? 'http://10.0.3.2:3000/v1' // works for Genymotion
  : 'http://localhost:3000/v1';

export const apiMiddleware = store => next => action => {
  // Pass all actions through by default
  next(action);
  switch (action.type) {
    // In case we receive an action to send an API request
    case 'GET_ROUTINE_DATA':
      // Dispatch GET_ROUTINE_DATA_LOADING to update loading state
      store.dispatch({type: 'GET_ROUTINE_DATA_LOADING'});
      // Make API call and dispatch appropriate actions when done
      fetch(`${API}/routines.json`)
        .then(response => response.json())
        .then(data => next({
          type: 'GET_ROUTINE_DATA_RECEIVED',
          data
        }))
        .catch(error => next({
          type: 'GET_ROUTINE_DATA_ERROR',
          error
        }));
      break;
    // Do nothing if the action does not interest us
    default:
      break;
  }
};

// Acts on data stored in passed response data by middleware
export const reducer = (state = { routines: [], loading: true }, action) => {
  switch (action.type) {
    case 'GET_ROUTINE_DATA_LOADING':
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };
    case 'GET_ROUTINE_DATA_RECEIVED':
      return {
        loading: false,        // set loading to false
        routines: action.data, // update routines array with reponse data
      };
    case 'GET_ROUTINE_DATA_ERROR':
      return state;
    default:
      return state;
    }
};
