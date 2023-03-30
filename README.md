# volto-icon-selector-widget

## Feature
This widget is used to select visualy from a list of icon with a popup and a search field. The icon list is base on Font Awesome 6.4.0

### Settings
You can configure the icon list and default search result renderer (ResultRenderer, CategoryRenderer and CategoryLayoutRenderer) in `config.settings.widget.icon_selector.iconList` and `config.settings.widget.icon_selector.defaultRenderer`

#### Icon list structure

```
{
  [category id] : {
    'title': [category title]
    'list': [
      {'name' : [name of the icon]},
      ...
    ]
  },
  ...
}
```

## Getting started

### Add volto-block-style to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
  "addons": [
      "@affinitic/volto-icon-selector-widget"
  ],

  "dependencies": {
      "@affinitic/volto-icon-selector-widget": "^0.0.0"
  }
  ```

- If not, create one:

  ```
  npm install -g yo @plone/generator-volto
  yo @plone/volto my-volto-project --addon @affinitic/volto-icon-selector-widget
  cd my-volto-project
  ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!
