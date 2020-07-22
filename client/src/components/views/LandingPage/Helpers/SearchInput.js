import React, { useState } from 'react';
import { Input } from 'antd';

let { Search } = Input;

const SearchInput = ({ refreshFunction }) => {
  const [SearchTerm, setSearchTerm] = useState('');

  const onChangeSearch = (e) => {
    setSearchTerm(e.target.value);
    refreshFunction(e.target.value);
  };

  return (
    <div>
      <Search
        onChange={onChangeSearch}
        value={SearchTerm}
        placeholder='Search Title...'
      />
    </div>
  );
};

export default SearchInput;
