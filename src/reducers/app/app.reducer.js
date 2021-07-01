const initialState = {
  user: {},
  notification: []
};

const template = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      state.notification = action.data;
      return {...state, notification: action.data};
    case "SET_USER":
      state.user = action.data;
      return {...state, user: action.data};
    default:
      return state;
  }
};

export default template;
