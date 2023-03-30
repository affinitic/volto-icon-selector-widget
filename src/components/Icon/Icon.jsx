import React from 'react';
import '@affinitic/volto-icon-selector-widget/styles/style.less';

const Icon = (props) => {
  const { name, size } = props;
  const formatedName = name
    .split(' ')
    .map((separetedName) => `fa-${separetedName}`)
    .join(' ');
  return <i className={`af-icon fa-solid ${formatedName} ${size}`}></i>;
};

export default Icon;
