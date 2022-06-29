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

export const getPets = () => async dispatch => {
  try {
    const response = await axios.get(
      'https://petstore.swagger.io/v2/pet/findByStatus?status=available'
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
