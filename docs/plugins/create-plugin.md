# How to create a plugin

This guide describes how to create a new plugin. It includes how to create a plugin `config.json` file, and how to validate it before you publish it.

## Example plugins

For an example of how plugin config files are constructed, take a look at the `now-prototype-it.config.json` files in the following NPM packages:

- [GOV.UK Frontend Adaptor](https://github.com/nowprototypeit/adaptors/tree/main/govuk-frontend-adaptor)
- [Now Prototype It Design System](https://github.com/nowprototypeit/design-system)
- [The plugins we use for our automated tests](https://github.com/nowprototypeit/nowprototypeit/tree/main/features/fixtures/plugins)

## Before you start

Before you create a new plugin, make sure you:

* Install the required tools listed in the [Setup](/getting-started/setup) documentation.
* See [Understand plugins](/plugins/understand-plugins) for details on what plugins do, and how users interact with them.

## Create a plugin

plugins are `config.json` files that anybody can use in their prototypes. This section describes how to create that config file, including how to build and populate it, and how to validate it. 

### Create a plugin config file

A plugin config file must contain at least a description. However, you can include all of the following into a plugin:

- A description of the plugin
- URLs to the plugin's documentation, version history, and release notes
- Variables for Nunjucks and SASS to use
- Settings for the user to configure in the browser, which are then provided to Nunjucks and SASS
- SASS files
- Assets such as images, fonts, and icons
- Javascript files to embed on every page (as long as the page uses the standard includes)
- CSS files to embed on every page (as long as the page uses the standard includes)
- Nunjucks macros (often known as components)
- Nunjucks includes and templates
- Related plugins to encourage the user to install
- Plugin dependencies that are required for the functionality of the plugin
- Page templates that the user can use to create new pages in their prototype
- Express routers for multi-page flows and helpers
- Proxy plugin configuration which is treated as the plugin configuration for other dependencies that don't have their own configuration.

### Validate your new plugin

You can run our plugin validator tool to check your plugin is valid.  It doesn't highlight every issue, but it will help you find common problems.

```bash
npx nowprototypeit validate-plugin
```

If you find issues with the validator, please [raise an issue on GitHub](https://github.com/nowprototypeit/nowprototypeit/issues).
