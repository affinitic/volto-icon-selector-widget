import React from 'react';

const CategoryRenderer = (props) => {
  const { name } = props;
  return <div className="category-title">{name}</div>;
};

export default CategoryRenderer;
