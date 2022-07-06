import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPet} from '../actions/Pets';
import './PetView.css';

const PetView = () => {
  const pet = useSelector(state => state.petDetails);
  const dispatch = useDispatch();
  const {id} = useParams();
  useEffect(() => {
    dispatch(getPet(id));
  }, [id]);

  return (
    <div>
      {pet && (
        <div className="view-pet__container">
          <div className="pet-details">
            <p>Name: {pet.name} </p>
            <p>Status:{pet.status} </p>
            {/* <p>Tags:</p> */}
          </div>
          <div className="pet-images">
            {(pet.photoUrls.length &&
              pet.photoUrls.map(img => <img src={img} alt="Cat"></img>)) || (
              <p>No Photos</p>
            )}
          </div>

          <Link to="/pets">Back to Pets List</Link>
        </div>
      )}
    </div>
  );
};

export default PetView;
