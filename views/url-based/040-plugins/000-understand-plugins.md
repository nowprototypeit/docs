# Understand plugins

This page explains what plugins are, and the basic concepts you need to know in order to work with them.

A Now Prototype It **plugin** is an NPM package that contains a `now-prototype-it.config.json` file. 

A plugin config file defines styles, assets, components, and anything else you might need to configure the look and behavior of your prototype. Plugins allow you to add new features, modify existing behaviour, or integrate with external services without changing the core codebase.

Plugins can include a wide range of features, such as Nunjucks macros, SASS files, JavaScript, CSS, and SASS.

## Why use plugins?

We often say Now Prototype It is "powered by your design system". Plugins are a key part of that.

Plugins are a powerful way to extend the functionality of your prototype. They have two key benefits:

* Developers can create templates and pages that match their organisation's existing design.
* UX and content designers can quickly access the styles and assets they need to build functioning prototypes.

Our goal is that you can use Now Prototype It to have power over the user's experience, without having to fork the project. Plugins are a key part of that.

## Who can make plugins?

Anyone who can create a `.json` file can create and publish a plugin for Now Prototype It. 

We don't keep a formal list of plugins. Anyone can publish a plugin, and anyone can use that plugin.

## External supported plugin formats

In addition to Now Prototype It plugins, we also support plugins created for the GOV.UK Prototype Kit, which we forked to create Now Prototype It. These plugins are not as powerful as Now Prototype It plugins, but they can be used in Now Prototype It.