import React from 'react';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';

const CategoryRenderer = (props) => {
  const { name } = props;
  return <div className="category-title">{name}</div>;
};

export default CategoryRenderer;
