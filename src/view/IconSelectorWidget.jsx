import React from 'react';
import cx from 'classnames';
import { Icon } from '@affinitic/volto-icon-selector-widget/components';

const IconSelectorWidget = (props) => {
  const { value, className } = props;
  return value ? (
    <span className={cx(className, 'icon-selector', 'widget')}>
      <Icon name={value} />
    </span>
  ) : (
    <></>
  );
};

export default IconSelectorWidget;
