import React from 'react';
import { Popup } from 'semantic-ui-react';
import { Icon } from '@affinitic/volto-icon-selector-widget/components';

const ResultRenderer = (props) => {
  return <Popup trigger={<Icon name={props.name} />}>{props.name}</Popup>;
};

export default ResultRenderer;
