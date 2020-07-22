import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

import { PlusCircleTwoTone } from '@ant-design/icons';

const FileUpload = (props) => {
  const [Images, setImages] = useState([]);

  const onDrop = async (files) => {
    //console.log('THIS IS THE ACTUAL FILE', files);
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    //save The image We Choose inside the node js server
    const res = await axios.post('/api/1.0/uploadProduct', formData, config);
    if (res.data.success) {
      setImages([...Images, res.data.image]);
      props.refreshFunction([...Images, res.data.image]);
    } else {
      alert('Failed to save the Image in Server');
    }
  };

  //DELETE THE IMAGE
  const deleteImage = (image) => {
    const newImage = Images.filter((currentImage) => currentImage !== image);
    setImages([...newImage]);
    props.refreshFunction([...newImage]);
  };

  //checking

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}>
            {/* {console.log('getRootProps', { ...getRootProps() })}
            {console.log('getInputProps', { ...getInputProps() })} */}
            <input {...getInputProps()} />
            <PlusCircleTwoTone style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>

      {Images.length === 0 ? (
        <div style={{ margin: '5rem 10rem 0 0', textAlign: 'center' }}>
          <h2>
            Image Display Here
            <br />
            (Click to Delete)
          </h2>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              width: '350px',
              height: '240px',
              overflowX: 'scroll',
            }}>
            {Images.map((image, index) => (
              <div key={index} onClick={() => deleteImage(image)}>
                <img
                  style={{ minWidth: '300px', width: '330px', height: '240px' }}
                  src={`http://localhost:5000/${image}`}
                  alt={`productImg-${index}`}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
