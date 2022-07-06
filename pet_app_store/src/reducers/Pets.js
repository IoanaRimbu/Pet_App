let intialState = {pets: null, isLoading: false, recivedPets: false};

const pets = (state = intialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'RECIVE_PETS_SUCCESS':
      return {
        ...state,
        pets: payload,
        error: null,
        isLoading: false,
        recivedPets: true,
      };
    case 'RECIVE_PETS_FAILURE':
      return {
        ...state,
        error: payload,
        pets: null,
        isLoading: false,
        recivedPets: false,
      };
    case 'REQUEST_PETS':
      return {
        ...state,
        isLoading: true,
      };
    case 'CREATE_PETS_SUCCESS':
      return {
        ...state,
        pet: payload,
        error: null,
        isLoading: false,
        recivedPet: true,
      };
    case 'CREATE_PETS_FAILURE':
      return {
        ...state,
        error: payload,
        pet: null,
        isLoading: false,
        recivedPet: false,
      };
    case 'DELETE_PET_SUCCESS':
      return {
        ...state,
        error: null,
        isLoading: false,
        deletedPet: true,
      };
    case 'DELETE_PET_FAILURE':
      return {
        ...state,
        error: payload,
        isLoading: false,
        deletedPet: false,
      };
    case 'RECIVE_PET_SUCCESS':
      return {
        ...state,
        petDetails: payload,
        error: null,
        isLoading: false,
        recivedPetDetails: true,
      };
    case 'RECIVE_PET_FAILURE':
      return {
        ...state,
        error: payload,
        petDetails: null,
        isLoading: false,
        recivedPetDetails: false,
      };
    case 'EDIT_PET_SUCCESS':
      return {
        ...state,
        updatedPet: true,
        error: null,
        isLoading: false,
      };
    case 'EDIT_PET_FAILURE':
      return {
        ...state,
        error: payload,
        isLoading: false,
        updatedPet: false,
      };
    case 'EDIT_PAGE_CLEANUP':
      return {
        ...state,
        petDetails: null,
        error: null,
      };
    default:
      return state;
  }
};

export default pets;
