let intialState = {pets: null};

const pets = (state = intialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'RECIVE_PETS_SUCCESS':
      return {...state, pets: payload, error: null};
    case 'RECIVE_PETS_FAILURE':
      return {
        ...state,
        error: payload,
        pets: null,
      };

    default:
      return state;
  }
};

export default pets;
