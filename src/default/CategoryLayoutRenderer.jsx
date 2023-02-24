import React from 'react';

const CategoryLayoutRenderer = (props) => {
  const { categoryContent, resultsContent } = props;
  return (
    <div>
      <h3 className="name">{categoryContent}</h3>
      <div className="results">{resultsContent}</div>
    </div>
  );
};

export default CategoryLayoutRenderer;
