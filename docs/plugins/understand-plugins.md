# Understand plugins

We often say Now Prototype It is "powered by your design system". Plugins are a key part of that.

A plugin defines styles, assets, components, and anything else you might need to configure the look and behavior of your prototype. Plugins allow you to add new features, modify existing behaviour, or integrate with external services without changing the core codebase.

Under the hood, a Now Prototype It **plugin** is an NPM package that contains a `now-prototype-it.config.json` file. 

Plugins can include a wide range of features, such as Nunjucks macros, SASS files, JavaScript, CSS, and SASS.

## Why use plugins?

Plugins offer a powerful way to extend the functionality of your prototype. They have two key benefits:

* Developers can create and share styles and page layouts that match their organisation's existing design.
* UX and content designers can quickly access the assets they need to build functioning prototypes.

With Now Prototype It, you can fully design the user's experience without needing to fork the project. Plugins are a key part of that.

## Who can make plugins?

Anyone who can create a `.json` file can create and publish a plugin for Now Prototype It. 

We don't keep a formal list of plugins. Anyone can publish a plugin, and anyone can use that plugin.

## External supported plugin formats

In addition to Now Prototype It plugins, we also support plugins created for the GOV.UK Prototype Kit.
