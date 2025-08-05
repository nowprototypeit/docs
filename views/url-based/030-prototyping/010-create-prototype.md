# Create a new prototype

This guide explains how to create a new prototype. 

If you'd like to experiment with an existing prototype first, see [Try a demo prototype](/try-demo-prototype).

## Before you start

Before you create a new prototype, make sure you:

* Install the prerequisite tools listed in the [Installation](/installation) documentation.
* See [Understand prototypes](/variants/understand-prototypes) for details on the structure of a prototype, and what you can do with them.

## Create a new prototype

To create a blank protoype using the default settings, open your terminal and run the following command (replace `prototype-name` with a name):

```
npx nowprototypeit create prototype-name
```

The default configuration includes essential features like Nunjucks templating, SASS styling, and JavaScript functionality.

## Create a prototype with a variant

Variants are pre-configured setups that include various features and tools to help you prototype quickly. If your organisation  already has a variant, you can specify it when you create a prototype. 

To specify a variant, you add `--variant` to your command, like this:

```
npx nowprototypeit create --variant variant-name prototype-name
```

See [Variants](/variants) for more information.