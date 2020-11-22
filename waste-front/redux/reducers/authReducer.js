const initialState = {
  isLogged: false,
  userId: null,
  role : null,
  username : null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
        return Object.assign({}, state, { isLogged: true});
    case 'USER':
        return Object.assign({}, state, { userId: action.payload});
    case 'ROLE':
        return Object.assign({}, state, { role: action.payload});
    case 'USERNAME':
        return Object.assign({}, state, { username: action.payload});
    case 'LOGOUT':
        return { isLogged: false,userId: null,role : null,username : null};
    default:
        return state;
  }
};