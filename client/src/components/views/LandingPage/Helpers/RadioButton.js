import React, { Fragment, useState } from 'react';
import { Prices } from './Data';

import { Collapse, Radio } from 'antd';
let { Panel } = Collapse;

let { Group } = Radio;

const RadioButton = ({ handleFilter }) => {
  const [Value, setValue] = useState('0');

  const renderRadioButton = () => {
    return Prices.map((price, index) => (
      <Fragment key={index}>
        <Radio value={price._id}>{price.name}</Radio>
      </Fragment>
    ));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFilter(e.target.value);
  };

  return (
    <>
      <Collapse defaultActiveKey={['1']}>
        <Panel key='1' header='Prices'>
          <Group onChange={handleChange} value={Value}>
            {renderRadioButton()}
          </Group>
        </Panel>
      </Collapse>
    </>
  );
};

export default RadioButton;
