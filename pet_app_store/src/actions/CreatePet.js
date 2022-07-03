import * as types from '../constants/ActionsTypes';
import axios from 'axios';

const createPetsFailure = data => ({
  payload: data,
  type: types.CREATE_PETS_FAILURE,
});
const createPetsSuccess = data => ({
  payload: data,
  type: types.CREATE_PETS_SUCCESS,
});

const requestPets = () => ({
  type: types.REQUEST_PETS,
});

export const postPets = data => async dispatch => {
  dispatch(requestPets());
  try {
    const request = await axios.post(
      'https://petstore.swagger.io/v2/pet',
      data
    );
    dispatch(createPetsSuccess(request.data));
  } catch (error) {
    const message =
      (error.request && error.response.data && error.request.data.message) ||
      error.message ||
      error.toString();
    dispatch(createPetsFailure(message));
  }
};
