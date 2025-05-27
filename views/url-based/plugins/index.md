# Plugins

Plugins are a powerful way to extend the functionality of your application. They allow you to add new features, modify existing behaviour, or integrate with external services without changing the core codebase.

We often say Now Prototype It is "powered by your design system", plugins are a key part of that.

## Who can make and publish plugins?

Anyone can create a plugin for Now Prototype It. We don't keep a formal list of plugins, anyone can publish a plugin, and anyone can use that plugin.

A Now Prototype It plugin is just an NPM package that contains a `now-prototype-it.config.json` file. This file describes the plugin and its capabilities.  We use that to wire everything up for users who install the plugin.

## What can be included in a plugin?

- A description of the plugin
- URLs to the plugin's documentation, version history, and release notes
- Variables to be used by Nunjucks and SASS
- Settings for the user to configure in the browser, which are then provided to Nunjucks and SASS
- SASS files
- Assets such as images, fonts, and icons
- Javascript files to embed on every page (as long as the page uses the standard includes)
- CSS files to embed on every page (as long as the page uses the standard includes)
- Nunjucks macros (often known as components)
- Nunjucks includes and templates
- Related plugins to encourage the user to install
- Plugin dependencies which are required for the functionality of the plugin
- Page templates which the user can use to create new pages in their prototype
- Express routers for multi-page flows and helpers
- Proxy plugin configuration which is treated as the plugin configuration for other dependencies which don't have their own configuration

## Other supported plugin formats

We support plugins created for the GOV.UK Prototype Kit, which we forked to create Now Prototype It.  These plugins are not as powerful as Now Prototype It plugins, but they can be used in Now Prototype It.

## How do I find out more about plugins?

While we're working on this documentation the best things you can do are:

- Reach out to us at *support@nowprototype.it* with your questions
- [Raise an issue on GitHub](https://github.com/nowprototypeit/nowprototypeit/issues)
- Take a look at some existing plugins:
  - [GOV.UK Frontend Adaptor](https://github.com/nowprototypeit/adaptors/tree/main/govuk-frontend-adaptor)
  - [Now Prototype It Design System](https://github.com/nowprototypeit/design-system)
  - [The plugins we use for our automated tests](https://github.com/nowprototypeit/nowprototypeit/tree/main/features/fixtures/plugins)

## Validating plugins

You can run our plugin validator tool to check your plugin is valid.  It doesn't highlight every issue, but it will help you find common problems.

```bash
npx nowprototypeit validate-plugin
```

If you find issues with the validator, please [raise an issue on GitHub](https://github.com/nowprototypeit/nowprototypeit/issues).


## Summary

Plugins are a powerful way to extend the functionality of Now Prototype It. Anyone can create and publish plugins, and they can include a wide range of features such as Nunjucks macros, SASS files, JavaScript, CSS, and more.

Our goal is that you can treat Now Prototype It and have power over the user's experience, without having to fork the project.  Plugins are a key part of that, and we hope you find them useful.
