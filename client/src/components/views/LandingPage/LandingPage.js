import React, { useState, useEffect, useRef } from 'react';
import { RocketTwoTone, ConsoleSqlOutlined } from '@ant-design/icons';
import axios from 'axios';

import Card from './shared/Card';
import Checkbox from './Helpers/Checkbox';
import RadioButton from './Helpers/RadioButton';
import { Prices } from './Helpers/Data';
import SearchInput from './Helpers/SearchInput';

import { Row, Spin, Button, Col } from 'antd';

const LandingPage = () => {
  //All the data
  const [products, setProducts] = useState([]);
  const [loading, setLoding] = useState(false);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState();
  const [Filter, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerms, setSearchTerms] = useState('');

  // const [visible, setVisible] = useState(8);

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    fetchData(variables);
  }, []);

  const fetchData = async (variables) => {
    try {
      setLoding(true);
      const res = await axios.post('api/1.0/getProduct', variables);
      const data = await res.data;

      if (data.success === true) {
        if (variables.loadMore) {
          setProducts([...products, ...data.products]);
        } else {
          setProducts(data.products);
        }
        setPostSize(data.postSize);
      }
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(false);
    }
  };

  const showFilteredResult = (filters) => {
    const variables = {
      skip: 0,
      limit: 8,
      filters: filters,
    };
    // console.log(variables);

    fetchData(variables);
    setSkip(0);
  };

  //Handle Price
  const handlePrice = (value) => {
    const data = Prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  //ON LOAD MORE
  const onLoadMore = () => {
    let skip = Skip + Limit; //IN First Time SKip will be 0 And Limit will be 8
    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filter,
      searchTerm: SearchTerms,
    };
    fetchData(variables);

    setSkip(skip);
  };

  const handleFilter = (filters, catagory) => {
    const newFilters = { ...Filter };

    newFilters[catagory] = filters; //  newFilter["continents"] = SELECTED CHECKBOX ARRAY LIKE [3,4]

    if (catagory === 'price') {
      let priceValues = handlePrice(filters);
      newFilters[catagory] = priceValues;
    }

    showFilteredResult(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filter,
      searchTerm: newSearchTerm,
    };
    setSearchTerms(newSearchTerm);

    fetchData(variables);
  };

  //THIS IS ALTERNATIVE SOLUATION FOR LOAD MODE
  // const increserVisible = () => {
  //   setVisible(visible + 4);
  // };

  return (
    <div style={{ width: '70%', margin: '5rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>
          Let's Travel Anywhere <RocketTwoTone />{' '}
        </h2>
      </div>
      {/* FIlteer Place */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Checkbox
            handleFilter={(filters) => handleFilter(filters, 'continents')}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <RadioButton
            handleFilter={(filters) => handleFilter(filters, 'price')}
          />
        </Col>
      </Row>

      {/* Search Place */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1rem auto',
        }}>
        <SearchInput refreshFunction={updateSearchTerms} />
      </div>

      {!loading && products.length === 0 ? (
        <div
          style={{
            display: 'flex',
            height: '300px',
            justifyContent: 'center',
            fontWeight: 'bold',
            alignItems: 'center',
          }}>
          <h2 style={{ color: '#A020F0', fontSize: '1.5rem' }}>No post</h2>
        </div>
      ) : (
        <>
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '5rem' }}>
              <Spin size='large' tip='Data is Loading..' />
            </div>
          ) : (
            <Row gutter={[16, 16]} style={{ marginTop: '3rem' }}>
              <Card products={products} />
            </Row>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {postSize >= Limit && (
              <Button color='primary' onClick={onLoadMore}>
                Load More
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default LandingPage;
