import React, { useState } from 'react';
import Fileupload from '../../utils/Fileupload';
import axios from 'axios';

import { Typography, Input, Form, Button, message } from 'antd';
let { Title } = Typography;
let { TextArea } = Input;

const UploadProduct = (props) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);

  const [Images, setImage] = useState([]);

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  //SELECT(OPTION)
  let Countrys = [
    { key: 1, value: 'India' },
    { key: 2, value: 'Canada' },
    { key: 3, value: 'Australia' },
    { key: 4, value: 'US' },
    { key: 5, value: 'New Zeland' },
  ];
  //onSubmit

  const updateImages = (newFile) => {
    setImage(newFile);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !ContinentValue || !Images) {
      alert('fill all the fields first!');
    }
    const productDataToSend = {
      writer: props.user.userData._id,
      title: title,
      images: Images,
      description: description,
      price: price,
      continents: ContinentValue,
    };
    console.log(productDataToSend);

    const res = await axios.post('/api/1.0/addProduct', productDataToSend);
    if (res.data.success) {
      message
        .success('Added SuccessFully', 1)
        .then(() => props.history.push('/'));
    } else {
      message.error('Somthing Went Wrong', 2);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Travel Images </Title>
      </div>
      <Form onSubmit={onSubmit}>
        <Fileupload refreshFunction={updateImages} />
        <br />
        <label>Title</label>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type='text'
          name='text'
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type='text'
        />
        <br />
        <br />
        <label style={{ display: 'block', marginBottom: '0.3rem' }}>
          Price:
        </label>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type='number'
            name='price'
            style={{ width: '100%', marginRight: '1rem' }}
          />

          <select onChange={onContinentsSelectChange} value={ContinentValue}>
            {Countrys.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}{' '}
              </option>
            ))}
          </select>
        </div>

        <Button
          type='primary'
          onClick={onSubmit}
          style={{
            marginTop: '1rem',
            display: 'block',
            margin: '2rem auto',
            width: '20%',
          }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UploadProduct;
