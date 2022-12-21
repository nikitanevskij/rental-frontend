import React from 'react';
import { Cascader } from 'antd';

export const CascaderInput = () => {
  const bikeList = [
    'Silverback L 26 blue 1729',
    'Stels M 26 light blue',
    'Silverback L 26 blue 2209',
    'Silverback L 26 blue 2344',
    'Silverback L 26 blue 2323',
    'Silverback L 26 blue 1133',
    'Silverback L 26 blue 9090',
  ];
  const options = [
    {
      label: 'Bелосипеды',
      value: 'bike',
      children: bikeList.map((item, index) => ({
        label: item,
        value: item,
      })),
    },
    {
      label: 'Самокаты',
      value: 'samokat',
      children: new Array(15).fill(null).map((_, index) => ({
        label: `Самокат ${index}`,
        value: index,
      })),
    },
  ];
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <>
      <Cascader
        style={{
          width: '100%',
        }}
        options={options}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
      />
    </>
  );
};
