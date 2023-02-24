import IconSelectorWidgetView from './view/IconSelectorWidget';
import IconSelectorWidget from './widget/IconSelectorWidget';
import {
  ResultRenderer,
  CategoryRenderer,
  CategoryLayoutRenderer,
  iconList,
} from './default';

const applyConfig = (config) => {
  config.widgets.widget['icon_selector'] = IconSelectorWidget;
  config.widgets.views.widget['icon_selector'] = IconSelectorWidgetView;

  config.settings = {
    ...config.settings,
    widget: {
      icon_selector: {
        iconList: iconList,
        defaultRenderer: {
          ResultRenderer,
          CategoryRenderer,
          CategoryLayoutRenderer,
        },
      },
    },
  };

  return config;
};

export default applyConfig;
