import _ from 'lodash';
import React, { useState } from 'react';
import { FormFieldWrapper } from '@plone/volto/components';
import { Search } from 'semantic-ui-react';
import { Icon } from '@affinitic/volto-icon-selector-widget/components';
import { useIntl, defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  placeholder: {
    id: 'Search...',
    defaultMessage: 'Search...',
  },
});

const initialState = {
  loading: false,
  results: {},
  value: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState;
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query };
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results };
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

const IconSelectorWidget = (props) => {
  const intl = useIntl();
  const {
    id,
    value: blockValue,
    onChange,
    onBlur,
    placeholder = intl.formatMessage(messages.placeholder),
  } = props;

  const inputId = `field-${id}`;

  const { iconList, defaultRenderer } = config.settings.widget.icon_selector;

  const [focus, setFocus] = useState(false);

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i');
      const isMatch = (result) => re.test(result.name);

      const filteredResults = _.reduce(
        iconList,
        (memo, data, name) => {
          const results = _.filter(data.list, isMatch);
          if (results.length) memo[name] = { name: data.title, results }; // eslint-disable-line no-param-reassign

          return memo;
        },
        {},
      );

      dispatch({
        type: 'FINISH_SEARCH',
        results: filteredResults,
      });
    }, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <FormFieldWrapper {...props} className="icon-selector">
        <div className="wrapper">
          <Icon name={value ? value : blockValue} />
          <Search
            id={inputId}
            name={id}
            category
            loading={loading}
            placeholder={placeholder}
            onResultSelect={(e, data) => {
              dispatch({
                type: 'UPDATE_SELECTION',
                selection: data.result.name,
              });
              onChange(
                id,
                data.result.name === '' ? undefined : data.result.name,
              );
            }}
            onSearchChange={handleSearchChange}
            onBlur={({ target }) => {
              setFocus(false);
              onBlur &&
                onBlur(id, target.value === '' ? undefined : target.value);
            }}
            onFocus={(event, data) => setFocus(true)}
            results={results}
            value={value ? value : focus ? '' : blockValue}
            defaultValue={blockValue ? blockValue : ''}
            categoryLayoutRenderer={defaultRenderer.CategoryLayoutRenderer}
            categoryRenderer={defaultRenderer.CategoryRenderer}
            resultRenderer={defaultRenderer.ResultRenderer}
            aligned="right"
          />
        </div>
      </FormFieldWrapper>
    </>
  );
};

export default IconSelectorWidget;
