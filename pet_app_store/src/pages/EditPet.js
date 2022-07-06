import React from 'react';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {editPageCleanUp, getPet} from '../actions/Pets';
import 'antd/dist/antd.css';
import AddingPet from './AddingPet';

const EditPet = () => {
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getPet(id));
  }, [id]);

  useEffect(() => {
    return () => dispatch(editPageCleanUp());
  }, []);
  return (
    <div>
      <AddingPet />
    </div>
  );
};

export default EditPet;
