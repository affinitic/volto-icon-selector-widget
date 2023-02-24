import React from 'react';
import { Icon, Popup } from 'semantic-ui-react';

const ResultRenderer = (props) => {
  return <Popup trigger={<Icon name={props.name} />}>{props.name}</Popup>;
};

export default ResultRenderer;
