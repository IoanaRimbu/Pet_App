import React from 'react';
import {Link} from 'react-router-dom';
import {Modal, Space} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deletePet, getPets} from '../actions/Pets';
import DefaultTable from '../components/Table';
import 'antd/dist/antd.css';
import './PetsList.css';

const PetsList = () => {
  const [petStatus, setPetStatus] = useState('available');
  const [page, setPage] = useState(1);
  const [headerDisplay, setHeaderDisplay] = useState(false);
  const [headerDisplayMessage, setHeaderDisplayMessage] = useState('');

  const pets = useSelector(state => state.pets);
  const pet = useSelector(state => state.pet);
  const updatedPet = useSelector(state => state.updatedPet);
  const deletedPet = useSelector(state => state.deletedPet);
  const error = useSelector(state => state.error);
  const loading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPets(petStatus));
  }, [petStatus]);

  useEffect(() => {
    if (!error) {
      if (pet) {
        setHeaderDisplayMessage('Pet added with success');
        setHeaderDisplay(true);
      } else if (deletedPet) {
        setHeaderDisplayMessage('Pet deleted with success');
        setHeaderDisplay(true);
      } else if (updatedPet) {
        setHeaderDisplayMessage('Pet updated with success');
        setHeaderDisplay(true);
      }
    } else if (error) {
      setHeaderDisplayMessage('Something went wrong...');
      setHeaderDisplay(true);
    }
    setTimeout(() => {
      setHeaderDisplay(false);
    }, 2000);
  }, [loading]);

  const handleStatus = e => {
    setPetStatus(e.target.value);
  };

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      colSpan: 1,
      render: (value, item, index) => (page - 1) * 10 + (index + 1),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space perStatus={petStatus} size="middle">
          <Link to={`/pets/viewPet/${record.id}`}>View</Link>
          <Link to={`/pets/editPet/${record.id}`}>Edit</Link>
          {/* <a>Edit</a> */}
          <a
            onClick={e => {
              Modal.confirm({
                title: 'Are you sure you want to delete this pet?',
                onOk: () => {
                  dispatch(deletePet(record.id));
                  setTimeout(() => {
                    dispatch(getPets(petStatus));
                  }, 2000);
                },
              });
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="pet-list__container">
      <div className="header-display">
        <Link to="/pets/addPet" id="new_entry_new_pet">
          Add new pet
        </Link>
        {headerDisplay && (
          <p style={{borderColor: error && 'red', color: error && 'red'}}>
            {headerDisplayMessage}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="status">Select status</label>
        <select id="petStatus" name="status" onChange={handleStatus}>
          <option value="available">available</option>
          <option value="sold">sold</option>
          <option value="pending">pending</option>
        </select>
      </div>
      <DefaultTable
        data={pets}
        columns={columns}
        className="pets-list__table"
        // rowKey="id"
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
      />
    </div>
  );
};

export default PetsList;
