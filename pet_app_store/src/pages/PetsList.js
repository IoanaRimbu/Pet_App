import React from 'react';
import {Link} from 'react-router-dom';
import {message, Space} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPets} from '../actions/Pets';
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
  const error = useSelector(state => state.error);
  const loading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPets(petStatus));
  }, [petStatus]);

  useEffect(() => {
    if (pet && !error) {
      setHeaderDisplayMessage('Pet added with success');
      setHeaderDisplay(true);
    } else if (!pets && loading) {
      setHeaderDisplayMessage('Pet added - error');
      setHeaderDisplay(true);
    }
    setTimeout(() => {
      setHeaderDisplay(false);
    }, 2000);
  }, [pet]);

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
        <Space size="middle">
          <a>View</a>
          <a>Edit</a>
          <a>Delete</a>
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
        {headerDisplay && <p>{headerDisplayMessage}</p>}
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
