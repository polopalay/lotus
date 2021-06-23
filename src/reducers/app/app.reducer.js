const initialState = {
  user: {}
};

const template = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      state.user = action.data;
      return {...state, user: action.data};
    default:
      return state;
  }
};

export default template;
