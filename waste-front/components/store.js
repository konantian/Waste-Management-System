import {createStore, applyMiddleware, compose} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import thunk from 'redux-thunk';

// create your reducer
const initialState = {
    isLogged: false,
    userId: null,
    role : null,
    username : null
  };
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
            return {...state, isLogged: true};
      case 'USER':
            return {...state, userId: action.payload};
      case 'ROLE':
            return {...state, role: action.payload};
      case 'USERNAME':
            return {...state, username: action.payload};
      case 'LOGOUT':
          return { isLogged: false,userId: null,role : null,username : null};
      default:
          return state;
    }
  };

// create a makeStore function
const composeEnhancers = typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initStore = () => createStore(
    authReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
  );
// export an assembled wrapper
export const wrapper = createWrapper(initStore, {debug: true});