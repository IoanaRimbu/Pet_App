import React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {Button, Form, Input, Select} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {postPets} from '../actions/Pets';
import 'antd/dist/antd.css';
import './AddingPet.css';

const {Option} = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 12,
    span: 12,
  },
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const AddingPet = () => {
  const [pet, setPet] = useState({photoUrls: []});

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="add-pet">
      <Form
        form={form}
        {...layout}
        initialValues={{fotoUrls: ['']}}
        onFinish={() => {
          dispatch(postPets(pet));
          navigate('/pets');
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            value={pet.name}
            onChange={e => setPet({...pet, name: e.target.value})}
          />
        </Form.Item>

        <Form.Item name="id" label="Id">
          <Input />
        </Form.Item>

        <Form.Item
          className="status-field__selector"
          name="status"
          label="Status"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="available">available</Option>
            <Option value="sold">sold</Option>
            <Option value="pending">pending</Option>
          </Select>
        </Form.Item>

        {/* =======================>>>>>>> add input for imageUrl*/}
        <Form.List name="fotoUrls" className="foto-urls__input">
          {(fields, {add, remove}, {errors}) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'fotoUrls' : ''}
                  required={true}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      value={pet.photoUrls[index]}
                      onChange={e => {
                        let currentUrlArr = pet.photoUrls;

                        currentUrlArr[index] = e.target.value;
                        setPet({...pet, photoUrls: currentUrlArr});
                      }}
                      placeholder="fotoUrls"
                      style={{
                        width: '60%',
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        let currentUrlArr = pet.photoUrls;
                        currentUrlArr.splice(index, 1);
                        setPet({...pet, photoUrls: currentUrlArr});
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: '50%',
                  }}
                  icon={<PlusOutlined />}
                >
                  Add image
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        {/* =======================>>>>>>> add input */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Add Pet
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
        <Link to="/pets">Back to Pets List</Link>
      </Form>
    </div>
  );
};

export default AddingPet;
