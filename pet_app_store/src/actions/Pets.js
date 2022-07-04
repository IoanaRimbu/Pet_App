import * as types from '../constants/ActionsTypes';
import axios from 'axios';

const receivePetsFailure = data => ({
  payload: data,
  type: types.RECIVE_PETS_FAILURE,
});
const receivePetsSuccess = data => ({
  payload: data,
  type: types.RECIVE_PETS_SUCCESS,
});

const requestPets = () => ({
  type: types.REQUEST_PETS,
});

const createPetsFailure = data => ({
  payload: data,
  type: types.CREATE_PETS_FAILURE,
});
const createPetsSuccess = data => ({
  payload: data,
  type: types.CREATE_PETS_SUCCESS,
});

const deletePetFailure = data => ({
  payload: data,
  type: types.DELETE_PET_FAILURE,
});
const deletePetSuccess = data => ({
  payload: data,
  type: types.DELETE_PET_SUCCESS,
});

export const getPets = status => async dispatch => {
  dispatch(requestPets());
  try {
    const response = await axios.get(
      `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`
    );
    dispatch(receivePetsSuccess(response.data));
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(receivePetsFailure(message));
  }
};
// create pets

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
// delete pet
export const deletePet = id => async dispatch => {
  dispatch(requestPets());
  try {
    const response = await axios.delete(
      `https://petstore.swagger.io/v2/pet/${id}`
    );
    dispatch(deletePetSuccess(response.data));
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(deletePetFailure(message));
  }
};
