import React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPets} from '../actions/Pets';

const LandingPage = () => {
  const pets = useSelector(state => state.pets);
  const dispatch = useDispatch();
  console.log(pets);
  useEffect(() => {
    dispatch(getPets());
  }, []);

  return (
    <div>
      <h1>Under Construction</h1>
    </div>
  );
};

export default LandingPage;
