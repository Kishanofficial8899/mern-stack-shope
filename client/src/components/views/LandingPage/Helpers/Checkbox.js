import React, { useState, Fragment } from 'react';
import { Checkbox, Collapse } from 'antd';
import { continents } from './Data';
const { Panel } = Collapse;

//renderCheckbox

const CheckBox = ({ handleFilter }) => {
  const [Checked, setChecked] = useState([]);

  //Toggle
  const handleToggle = (checkboxid) => {
    const currentIndex = Checked.indexOf(checkboxid);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(checkboxid);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilter(newChecked);
  };

  const renderCheckbox = () => (
    <Fragment>
      {continents.map((value, index) => (
        <Fragment key={index}>
          <Checkbox
            onChange={() => handleToggle(value._id)}
            checked={Checked.indexOf(value._id) === -1 ? false : true}
            type='checkbox'
          />
          <span style={{ margin: '0.5rem' }}>{value.name}</span>
        </Fragment>
      ))}
    </Fragment>
  );
  return (
    <Collapse defaultActiveKey={['1']}>
      <Panel key='1' header='Continents'>
        {renderCheckbox()}
      </Panel>
    </Collapse>
  );
};
export default CheckBox;
